// Within react-dnd-html5-backend
// src/HTML5Backend.js

// ####################################
// ##### Add the following import #####
// ####################################
import setupTouchDNDCustomEvents from 'touch-dnd-custom-events';

// Other imports not shown

export default class HTML5Backend {
  constructor(manager) {
    // not shown
  }

  setup() {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.constructor.isSetUp) {
      throw new Error('Cannot have two HTML5 backends at the same time.');
    }
    this.constructor.isSetUp = true;
    this.addEventListeners(window);

    // ####################################
    // ##### Add the following line #######
    // ####################################
    this.addCustomEventListeners(window); 
  }

  teardown() {
    if (typeof window === 'undefined') {
      return;
    }

    this.constructor.isSetUp = false;
    this.removeEventListeners(window);

    // ####################################
    // ##### Add the following line #######
    // ####################################
    this.removeCustomEventListeners(window);
    
    this.clearCurrentDragSourceNode();
  }

  // ########################################
  // ##### Add the following function #######
  // ########################################
  addCustomEventListeners(target) {
    target.addEventListener(
      'touchdragstart', this.handleTopDragStart
    );
    target.addEventListener(
      'touchdragstart', this.handleTopDragStartCapture, true
    );
    target.addEventListener(
      'touchdragend', this.handleTopDragEndCapture, true
    );
    target.addEventListener(
      'touchdragenter', this.handleTopDragEnter
    );
    target.addEventListener(
      'touchdragenter', this.handleTopDragEnterCapture, true
    );
    target.addEventListener(
      'touchdragleave', this.handleTopDragLeaveCapture, true
    );
    target.addEventListener(
      'touchdragover', this.handleTopDragOver
    );
    target.addEventListener(
      'touchdragover', this.handleTopDragOverCapture, true
    );
    target.addEventListener(
      'touchdrop', this.handleTopDrop
    );
    target.addEventListener(
      'touchdrop', this.handleTopDropCapture, true
    );
  }

  // ########################################
  // ##### Add the following function #######
  // ########################################
  removeCustomEventListeners(target) {
    target.removeEventListener(
      'touchdragstart', this.handleTopDragStart
    );
    target.removeEventListener(
      'touchdragstart', this.handleTopDragStartCapture, true
    );
    target.removeEventListener(
      'touchdragend', this.handleTopDragEndCapture, true
    );
    target.removeEventListener(
      'touchdragenter', this.handleTopDragEnter
    );
    target.removeEventListener(
      'touchdragenter', this.handleTopDragEnterCapture, true
    );
    target.removeEventListener(
      'touchdragleave', this.handleTopDragLeaveCapture, true
    );
    target.removeEventListener(
      'touchdragover', this.handleTopDragOver
    );
    target.removeEventListener(
      'touchdragover', this.handleTopDragOverCapture, true
    );
    target.removeEventListener(
      'touchdrop', this.handleTopDrop
    );
    target.removeEventListener(
      'touchdrop', this.handleTopDropCapture, true
    );
  }

  connectDragSource(sourceId, node, options) {
    setupTouchDNDCustomEvents();

    this.sourceNodes[sourceId] = node;
    this.sourceNodeOptions[sourceId] = options;

    const handleDragStart = (e) => this.handleDragStart(e, sourceId);
    const handleSelectStart = (e) => this.handleSelectStart(e, sourceId);

    node.setAttribute('draggable', true);
    node.addEventListener('dragstart', handleDragStart);
    node.addEventListener('selectstart', handleSelectStart);

    // ####################################
    // ##### Add the following line #######
    // ####################################
    node.addEventListener('touchdragstart', handleDragStart);

    return () => {
      delete this.sourceNodes[sourceId];
      delete this.sourceNodeOptions[sourceId];

      node.removeEventListener('dragstart', handleDragStart);
      node.removeEventListener('selectstart', handleSelectStart);

      // ####################################
      // ##### Add the following line #######
      // ####################################
      node.removeEventListener('touchdragstart', handleDragStart);
      
      node.setAttribute('draggable', false);
    };
  }

  connectDropTarget(targetId, node) {
    const handleDragEnter = (e) => this.handleDragEnter(e, targetId);
    const handleDragOver = (e) => this.handleDragOver(e, targetId);
    const handleDrop = (e) => this.handleDrop(e, targetId);

    node.addEventListener('dragenter', handleDragEnter);
    node.addEventListener('dragover', handleDragOver);
    node.addEventListener('drop', handleDrop);

    // #######################################
    // ##### Add the following 3 lines #######
    // #######################################
    node.addEventListener('touchdragenter', handleDragEnter);
    node.addEventListener('touchdragover', handleDragOver);
    node.addEventListener('touchdrop', handleDrop);

    return () => {
      node.removeEventListener('dragenter', handleDragEnter);
      node.removeEventListener('dragover', handleDragOver);
      node.removeEventListener('drop', handleDrop);

      // #######################################
      // ##### Add the following 3 lines #######
      // #######################################
      node.removeEventListener('touchdragenter', handleDragEnter);
      node.removeEventListener('touchdragover', handleDragOver);
      node.removeEventListener('touchdrop', handleDrop);
    };
  }

  // The remaining 29 functions in this file
  // are unaffected: no changes required
}