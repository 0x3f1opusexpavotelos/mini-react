import { createElement, performUnitOfWork, commitWork} from './utils'

export const React = {createElement, createRoot, useState}

let wipRoot,
    currentRoot,
    nextUnitOfWork = null
let hookIndex = 0 // And we keep track of the current hook index.
function scheduleRerender() {
    nextUnitOfWork = wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot,
        hooks:[]
    }
}


function createRoot(_container) {
    return {
        render(el) {
            wipRoot = {
                dom: _container,
                props: {
                    children: [el]
                },
                hooks: [],
                alternate: {
                    hooks: []
                }
            }
            nextUnitOfWork = wipRoot
        }
    }
}

/**
 * browser event are blocked until entire render is finished
 * resumable render - May be paused, aborted or restarted by React.
 * the idea is the browser could interrupt our work before we finish rendering the whole tree
 * render then commit
 * time slicing and scheduler
 * user should not see complete UI
 * @param {*} deadline - how much time left before browser have to take control
 */

function workLoop(deadline) {
    let shouldYield = false
    while(nextUnitOfWork && shouldYield){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeReaming() < 1
    }
    requestIdleCallback(workLoop)
}


// when the browser is ready,it will call our workLoop and we’ll start working on the root.
requestIdleCallback(workLoop)





/**
 * We also add a hooks array to the fiber to support calling useState several times in the same component.
 * When the function component calls useState, we check if we have an old hook.
 *  We check in the alternate of the fiber using the hook index.
 * If we have an old hook, we copy the state from the old hook to the new hook, if we don’t we initialize the state.
 */

/**
 * @return a function to update a state
 */

function useState(initial) {
    const oldHook =
        wipFiber.alternate &&
        wipFiber.alternate.hooks &&
        wipFiber.alternate.hooks[hookIndex]

    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    }

    // next time we are rendering the component
    const actions = oldHook ? oldHook.queue: []
    actions.forEach(action => {
        hook.state = action(hook.state)
    })

    wipFiber.hooks.push(hook)
    hookIndex++

    const setState = action => {
        hook.queue.push(action)
    }
    //  set a new work in progress root as the next unit of work so the work loop can start a new render phase.
    wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate:currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []

    return [hook.state]
}


const r = (function(){

    let _val,_deps
    return {

    useState(initialValue) {
            _val = _val || initialValue
            function setState(newValue){
                _value = newValue
            }
            return [_val, setState]
    },
    useEffect(callback, depArray) {
            const hasNoDeps = !depArray
            const hasChangedDeps = _deps
              ? !depArray.every((el, i) => el === _deps[i])
              : true
            if (hasNoDeps || hasChangedDeps) {
              callback()
              _deps = depArray
            }
    }
    }
})()

