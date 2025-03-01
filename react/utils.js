

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern,
 * @see https://github.com/facebook/react/blob/f4cc45ce962adc9f307690e1d5cfa28a288418eb/packages/react/src/ReactElement.js#L111
 */
function createElement(type, props, ...children){
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === 'object'
                    ? child
                    : createTextElement(child)
            )
        }
    }
}


function createTextElement(text){
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

/**
 * @see https://github.com/facebook/react/tree/main/packages/scheduler for scheduler
 * sync render
 */
function createDom(fiber) {
    // create DOM node by element.type
    const dom =
        element.type === 'TEXT_ELEMENT'
            ? document.createTextNode(element.props.nodeValue)
            : document.createElement(fiber.type)

    // assign element prop to node
    // Object.keys(element.props)
    //     .filter(isProp)
    //     .forEach(name => {
    //         dom[name] = element.props[name]
    // })

    patchDom(dom, {}, fiber.props)

    return dom
    // recursive for child node
    // element.props.children.forEach(child => render(child))
    // append node container
    // container.appendChild(dom)
}










function updateFunctionComponent(fiber) {

    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}


function updateHostComponent(fiber) {
    if(!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
}

/**
* if it has a child that fiber will be the next unit of work.
 * If the fiber doesn’t have a child, we use the sibling as the next unit of work.
 * And if the fiber doesn’t have a child nor a sibling
 * And if the fiber doesn’t have a child nor a sibling, go upward until we reach root or find one with sibling
 * if we have reached the root, it means we have finished performing all the work for this render.
 * @returns nextUnitOfWork
 */
function performUnitOfWork(fiber){

    const isFunctionComponent =  fiber.type instanceof Function

    if(isFunctionComponent){
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }


    // create a DOM node and append it to dom
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    if(fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }

    // construct the fiber tree


    if(fiber.child) return fiber.child
    // If the fiber doesn’t have a child, we use the sibling as the next unit of work.
    nextFiber = fiber
    while(nextFiber){ // up until we reach root or find one with sibling
        if(fiber.sibling) return fiber.sibling
        nextFiber = fiber.parent
    }

}

/**
 * easy to find the next unit of work
 * That’s why each fiber has a link to its first child, its next sibling and its parent
 *
 * And we add it to the fiber tree setting it either as a child or as a sibling, depending on whether it’s the first child or not
 */

function reconcileChildren(fiber, children) {

    let idx=0,
        prevSibling = null

    while(idx < children.length) {
        const child = children[idx]
        // Then for each child we create a new fiber.
        const newFiber = {
            type: child.type,
            props: child.props,
            parent: fiber,
            dom:null,
            alternate: null,
            effectTag:  "PLACEMENT"
        }
        // add it to the fiber tree setting it either as a child or as a sibling,
        if(idx === 0) {
            fiber.child = newFiber
        } else {
            prev.sibling = newFiber
        }
        prevSibling = newFiber
        idx++
    }
}





function commitRoot(){

    commitWork(wipRoot.child)
    // save a ref to last fiber tree committed to dom
    currentRoot = wipRoot
    wipRoot = null
}

function commitWork(fiber){
    // reach leaf node return
    if(!fiber){
        return
    }

    let parentFiber = fiber.parent
    // go up the fiber tree until we find a fiber with a DOM node.
    while(!parentFiber.dom) {
        parentFiber = parentFiber.parent
    }

    const domParent = parentFiber.dom

    if(
        fiber.effectTag === "PLACEMENT" &&
        fiber.dom != null
    ) {
        domParent.appendChild(fiber.dom)
    } else if (
        fiber.effectTag === "UPDATE" &&
        fiber.dom != null
    ) {
        patchDom(
            fiber.dom,
            fiber.alternate.props,
            fiber.props
        )
    } else if(fiber.effectTag === "DELETION"){
        // go downward until we find a child with dom node
        domParent.removeChild(fiber.dom)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function commitDeletion(fiber,domParent){
    if(fiber.dom){
        domParent.removeChild(fiber)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}





const isEvent = key => key.startsWith("on")
const isProp = key =>
    key !== "children" && !isEvent(key)

const isNew = (prev, next) => key =>
    prev[key] !== next[key]

const isGone = (prev,next) => key => !(key in next)

function patchDom(dom, prevProps, nextProps){
    // Remove old or change event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(
            key =>
                !(key in nextProps) ||
                prevProps[key] !== nextProps[key]
        )
        .forEach(name => {
            const eventType = name
                .toLowerCase()
                .substring(2)
            dom.removeEventListener(
                eventType,
                prevProps[name]
            )
        })

    // Remove old props
    Object.keys(prevProps)
        .filter(isProp)
        .filter(isGone(prevProps, nextProps))
        .forEach(
            name => {
                dom[name] = ""
            }
        )

    // Set new or changed props
    Object.keys(nextProps)
        .filter(isProp)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = newProps[name]
        })

    // Add new event listeners
    Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
        const eventType = name
            .toLowerCase()
            .substring(2)
        dom.addEventListener(
            eventType,
            nextProps[name]
        )
    })

}
