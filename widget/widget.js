'use strict'
// Write your module here
// It must send an event "frames:loaded" from the top frame containing a list of { name:label } pairs,
// which describes all the fields in each frame.

// This is a template to help you get started, feel free to make your own solution.
function execute() {
	try {
    // Step 1 Scrape Fields and Create Fields list object.
    const fields = getFieldsFromDoc(document);
    
    // Step 2 Add Listener for Top Frame to Receive Fields.
    if (isTopFrame()) {
      window.addEventListener('message', (event) => {
        // - Merge fields from frames.
        // - Process Fields and send event once all fields are collected.
      });
    } else if (!isTopFrame()) {
      // Child frames sends Fields up to Top Frame.
    }
	} catch (e) {
		console.error(e)
	}
}

execute();

// Utility functions to check and get the top frame
// as Karma test framework changes top & context frames.
// Use this instead of "window.top".
function getTopFrame() {
  return window.top.frames[0];
}

function isTopFrame() {
  return window.location.pathname == '/context.html';
}

function getFieldsFromDoc(doc) {
  const fields = [];
  const formControls = doc.querySelectorAll('input, select, textarea');

  formControls.forEach(control => {
      const name = control.name || control.id; // Use id if name is not available
      const label = control.labels && control.labels.length > 0 ? control.labels[0].innerText : '';

      if (name) {
          fields.push({ name, label });
      }
  });

  return fields;
}