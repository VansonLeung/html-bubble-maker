
var DOMBubble = window.DOMBubble || (() => {

  const dom_default_style = {
    direction: 'bottom',
    position: '50%',
    borderColor: '#999999',
    borderWidth: '3px',
    background: '#eeeeee',
    borderRadius: '1.2em',
    height: '1em',
    angle: '90deg',
    minWidth: '',
    minHeight: '',
  }

  const __make_dom = (html) => {
    const d = document.createElement('div');
    d.innerHTML = html;
    const dom = d.children[0];
    return dom;
  }

  const make_dom_bubble = () => {
    const dom = __make_dom(`
    <div data-bubble data-bubble-body>
      <style data-bubble-style>
      </style>
      <div data-bubble-innerbody contenteditable>
      </div>
    </div>
    `);


    dom.uuid = `bubble-${Array.from(Array(20), () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    dom.innerbody = dom.querySelector('[data-bubble-innerbody]');
    dom.bubbleStyle = dom.querySelector('[data-bubble-style]');


    const map = {};

    for (var key in dom_default_style) {
      map[`_${key}`] = key;
      dom[`_${key}`] = dom_default_style[key];
    }



    for (var key in map) {
      const propKey = map[key];
      const mapKey = key;
      Object.defineProperty(dom, propKey, {
        get: function() {
          return dom[mapKey];
        },
        set: function(val) {
          dom[mapKey] = val;
          dom.refresh();
        },
        enumerable: true,
        configurable: true,
      }); 
    }

    Object.defineProperty(dom, "innerHTML", {
      get: function() {
        return dom.innerbody.innerHTML;
      },
      set: function(val) {
        dom.innerbody.innerHTML = val;
        dom.refresh();
      },
      enumerable: true,
      configurable: true,
    }); 

    dom.refresh = () => {
      __refresh_dom_bubble_style(dom);
    }

    __refresh_dom_bubble_style(dom);

    return dom;
  }



  const __refresh_dom_bubble_style = (dom) => {

    dom.setAttribute("data-bubble-uuid", dom.uuid);
    dom.setAttribute("data-bubble-is-engaged", "true")

    dom.domBubbleIsEngaged = true;

    let style1 = ``;
    let style2 = ``;

    if (dom.direction === 'bottom') {
      style1 = `
padding: 1em;
border-radius: var(--r) var(--r) min(var(--r),100% - var(--p) - var(--h)*tan(var(--a)/2)) min(var(--r),var(--p) - var(--h)*tan(var(--a)/2))/var(--r);
clip-path: polygon(0 100%,0 0,100% 0,100% 100%,
  min(100%,var(--p) + var(--h)*tan(var(--a)/2)) 100%,
  var(--p) calc(100% + var(--h)),
  max(0%  ,var(--p) - var(--h)*tan(var(--a)/2)) 100%);
background: var(--c1);
border-image: conic-gradient(var(--c1) 0 0) fill 0/
  var(--r) max(0%,100% - var(--p) - var(--h)*tan(var(--a)/2)) 0 max(0%,var(--p) - var(--h)*tan(var(--a)/2))/0 0 var(--h) 0;
position: relative;
`;
      style2 = `
content: "";
position: absolute;
z-index: -1;
inset: 0;
padding: var(--b);
border-radius: inherit;
clip-path: polygon(0 100%,0 0,100% 0,100% 100%,
  min(100% - var(--b),var(--p) + var(--h)*tan(var(--a)/2) - var(--b)*tan(45deg - var(--a)/4)) calc(100% - var(--b)),
  var(--p) calc(100% + var(--h) - var(--b)/sin(var(--a)/2)),
  max(       var(--b),var(--p) - var(--h)*tan(var(--a)/2) + var(--b)*tan(45deg - var(--a)/4)) calc(100% - var(--b)));
background: var(--c2) content-box;
border-image: conic-gradient(var(--c2) 0 0) fill 0/
  var(--r) max(var(--b),100% - var(--p) - var(--h)*tan(var(--a)/2)) 0 max(var(--b),var(--p) - var(--h)*tan(var(--a)/2))/0 0 var(--h) 0;
`;
    }
    else if (dom.direction === 'top') {
      style1 = `
padding: 1em;
border-radius: min(var(--r),var(--p) - var(--h)*tan(var(--a)/2)) min(var(--r),100% - var(--p) - var(--h)*tan(var(--a)/2)) var(--r) var(--r)/var(--r);
clip-path: polygon(0 0,0 100%,100% 100%,100% 0,
  min(100%,var(--p) + var(--h)*tan(var(--a)/2)) 0,
  var(--p) calc(-1*var(--h)),
  max(0%  ,var(--p) - var(--h)*tan(var(--a)/2)) 0);
background: var(--c1);
border-image: conic-gradient(var(--c1) 0 0) fill 0/
  0 max(0%,100% - var(--p) - var(--h)*tan(var(--a)/2)) var(--r) max(0%,var(--p) - var(--h)*tan(var(--a)/2))/var(--h) 0 0 0;
position: relative;
`;
      style2 = `
content: "";
position: absolute;
z-index: -1;
inset: 0;
padding: var(--b);
border-radius: inherit;
clip-path: polygon(0 0,0 100%,100% 100%,100% 0,
  min(100% - var(--b),var(--p) + var(--h)*tan(var(--a)/2) - var(--b)*tan(45deg - var(--a)/4)) var(--b),
  var(--p) calc(var(--b)/sin(var(--a)/2) - var(--h)),
  max(       var(--b),var(--p) - var(--h)*tan(var(--a)/2) + var(--b)*tan(45deg - var(--a)/4)) var(--b));
background: var(--c2) content-box;
border-image: conic-gradient(var(--c2) 0 0) fill 0/
  0 max(var(--b),100% - var(--p) - var(--h)*tan(var(--a)/2)) var(--r) max(var(--b),var(--p) - var(--h)*tan(var(--a)/2))/var(--h) 0 0 0;
`;
    }
    else if (dom.direction === 'left') {
      style1 = `
padding: 1em;
border-radius: var(--r)/min(var(--r),var(--p) - var(--h)*tan(var(--a)/2)) var(--r) var(--r) min(var(--r),100% - var(--p) - var(--h)*tan(var(--a)/2));
clip-path: polygon(0 0,100% 0,100% 100%,0 100%,
  0 min(100%,var(--p) + var(--h)*tan(var(--a)/2)),
  calc(-1*var(--h)) var(--p),
  0 max(0%  ,var(--p) - var(--h)*tan(var(--a)/2)));
background: var(--c1);
border-image: conic-gradient(var(--c1) 0 0) fill 0/
  max(0%,var(--p) - var(--h)*tan(var(--a)/2)) var(--r) max(0%,100% - var(--p) - var(--h)*tan(var(--a)/2)) 0/0 0 0 var(--h);
position: relative;
`;
      style2 = `
content: "";
position: absolute;
z-index: -1;
inset: 0;
padding: var(--b);
border-radius: inherit;
clip-path: polygon(0 0,100% 0,100% 100%,0 100%,
  var(--b) min(100% - var(--b),var(--p) + var(--h)*tan(var(--a)/2) - var(--b)*tan(45deg - var(--a)/4)),
  calc(var(--b)/sin(var(--a)/2) - var(--h)) var(--p),
  var(--b) max(       var(--b),var(--p) - var(--h)*tan(var(--a)/2) + var(--b)*tan(45deg - var(--a)/4)));
background: var(--c2) content-box;
border-image: conic-gradient(var(--c2) 0 0) fill 0/
  max(var(--b),var(--p) - var(--h)*tan(var(--a)/2)) var(--r) max(var(--b),100% - var(--p) - var(--h)*tan(var(--a)/2)) 0/0 0 0 var(--h);
`;
    }
    else if (dom.direction === 'right') {
      style1 = `
padding: 1em;
border-radius: var(--r)/var(--r) min(var(--r),var(--p) - var(--h)*tan(var(--a)/2)) min(var(--r),100% - var(--p) - var(--h)*tan(var(--a)/2)) var(--r);
clip-path: polygon(100% 0,0 0,0 100%,100% 100%,
  100% min(100%,var(--p) + var(--h)*tan(var(--a)/2)),
  calc(100% + var(--h)) var(--p),
  100% max(0%  ,var(--p) - var(--h)*tan(var(--a)/2)));
background: var(--c1);
border-image: conic-gradient(var(--c1) 0 0) fill 0/
  max(0%,var(--p) - var(--h)*tan(var(--a)/2)) 0 max(0%,100% - var(--p) - var(--h)*tan(var(--a)/2)) var(--r)/0 var(--h) 0 0;
position: relative;
`;
      style2 = `
content: "";
position: absolute;
z-index: -1;
inset: 0;
padding: var(--b);
border-radius: inherit;
clip-path: polygon(100% 0,0 0,0 100%,100% 100%,
  calc(100% - var(--b)) min(100% - var(--b),var(--p) + var(--h)*tan(var(--a)/2) - var(--b)*tan(45deg - var(--a)/4)),
  calc(100% + var(--h) - var(--b)/sin(var(--a)/2)) var(--p),
  calc(100% - var(--b)) max(       var(--b),var(--p) - var(--h)*tan(var(--a)/2) + var(--b)*tan(45deg - var(--a)/4)));
background: var(--c2) content-box;
border-image: conic-gradient(var(--c2) 0 0) fill 0/
  max(var(--b),var(--p) - var(--h)*tan(var(--a)/2)) 0 max(var(--b),100% - var(--p) - var(--h)*tan(var(--a)/2)) var(--r)/0 var(--h) 0 0;
`;
    }

    dom.bubbleStyle.innerHTML = `
[data-bubble][data-bubble-uuid=${dom.uuid}] {
${dom.minWidth ? `min-width: ${dom.minWidth};` : `` }
${dom.minHeight ? `min-height: ${dom.minHeight};` : `` }
}

[data-bubble][data-bubble-uuid=${dom.uuid}] {
/* triangle dimension */
--a: ${dom.angle}; /* angle */
--h: ${dom.height};   /* height */

--p: ${dom.position};  /* triangle position (0%:left 100%:right) */
--r: ${dom.borderRadius}; /* the radius */
--b: ${dom.borderWidth}; /* border width  */
--c1: ${dom.borderColor};
--c2: ${dom.background};

${style1}
}
[data-bubble][data-bubble-uuid=${dom.uuid}]:before {
${style2}
}
`
  }












  

  const initialize = (node) => {
    try {
      if (!node || !node.hasAttribute || node.tagName !== 'DOM-BUBBLE') {
        //
      } else {
        implementNode(node);
      }

      const children = node.children;
      if (children) {
        for (var k in children) {
          initialize(children[k]);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  const implementNode = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;

    // If node itself matches, convert it
    if (!node.domBubbleIsEngaged) {
      node = _convertDom(node);
    }

    return node;
  };

  const _convertDom = (inputNode) => {
    const dom = make_dom_bubble();
    dom.innerHTML = inputNode.innerHTML;

    for (var key in inputNode.dataset) {
      const val = inputNode.dataset[key];
      if (val) {
        dom[key] = val;
      }
    }
    inputNode.parentNode.replaceChild(dom, inputNode);
    return dom;
  };







  // Create a MutationObserver instance
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          initialize(node);
        });
      }
    });
  });
  
  // Start observing the target node (e.g., document.body or a specific parent element)
  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  });
  
  document.querySelectorAll('dom-bubble').forEach((n) => {
    initialize(n);
  })







  return {
    make_dom_bubble,
    dom_default_style,
  }

})();