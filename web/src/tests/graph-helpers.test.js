import cytoscape from 'cytoscape';

let cy;

beforeEach(()=>{
    let container = document.createElement('div');
    container.setAttribute('id', 'cy');
    document.body.appendChild(container)
    cy = cytoscape({
      container: container, // container to render in
      elements: [
          {group:'nodes', data:{id:'element1'}},
          {group:'nodes', data:{id:'element2'}},
          {group:'nodes', data:{id:'element3'}},
      ]})
    });

test("Clear graph clears all elements", () => {
    const elementCount = 1;
    expect(elementCount).toBe(0);
});