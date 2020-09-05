// Source of the code: https://jasonformat.com/wtf-is-jsx/

/** hyperscript generator, gets called by transpiled JSX */
function h(nodeName, attributes, ...args) {
	let children = args.length ? [].concat(...args) : null;
	return { nodeName, attributes, children };
}

/** Render Virtual DOM to the real DOM */
function render(vnode) {
	if (typeof vnode === 'string') return document.createTextNode(vnode);
	let node = document.createElement(vnode.nodeName);
	Object.keys(vnode.attributes || {}).forEach( key => node.setAttribute(key, vnode.attributes[key]) );
	(vnode.children || []).forEach( child => node.appendChild(render(child)) );
	return node;
}
