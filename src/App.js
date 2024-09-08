import $ from "jquery";
import React, { Component, createRef } from "react";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "FormBuilder in React",
  },
];

class FormBuilder extends Component {
  fb = createRef();
  formBuilderInstance = null;

  componentDidMount() {
    this.formBuilderInstance = $(this.fb.current).formBuilder({ formData });
  }

  handleSave = () => {
    const layoutData = this.formBuilderInstance.actions.getData("json");
    localStorage.setItem("formLayout", layoutData);
    alert("Layout saved successfully!");
  };

  handleLoad = () => {
    const savedLayout = localStorage.getItem("formLayout");
    if (savedLayout) {
      this.formBuilderInstance.actions.setData(JSON.parse(savedLayout));
      alert("Layout loaded successfully!");
    } else {
      alert("No layout found!");
    }
  };

  handlePublish = () => {
    const layoutData = this.formBuilderInstance.actions.getData();
    const publishWindow = window.open("", "_blank");
    publishWindow.document.write(this.buildHTML(layoutData));
  };

  buildHTML = (layoutData) => {
    let html = "<html><head><title>Published Form</title></head><body>";
    html += "<form>";
    layoutData.forEach((field) => {
      switch (field.type) {
        case "header":
          html += `<${field.subtype}>${field.label}</${field.subtype}>`;
          break;
        case "text":
          html += `${field.label}<input type="text" style="display: block;  margin-top: 7px;" placeholder="${field.placeholder || ''}" value="${field.value}" />`;
          break;

        case "file":
          console.log(field);
          html += `<label>${field.label}</label>`;
          html += `<input type="file" style="display: block; margin-top: 7px;" />`;
          break;

        case "checkbox-group":
          html += `<label>${field.label}</label>`;
          field.values.forEach(option => {
            html += `<label style="display: block; "><input type="checkbox" value="${option.value}" checked=${option.checked}/> ${option.label}</label><br />`;
          });
          break;

        case "date":
          html += `<label>${field.label}</label>`;
          html += `<label style="display: block; "><input type="date" value="${field.value}"/></label><br />`;
          break;

        case "number":
          html += `<label>${field.label}</label>`;
          html += `<label style="display: block; "><input type="number" value="${field.value}"/></label><br />`;
          break;
        case "paragraph":
          html += `<${field.subtype}>${field.label}</${field.subtype}>`;
          break;

        case "radio-group":
          html += `<label>${field.label}</label>`;
          field.values.forEach(option => {
            html += `<label style="display: block;"><input type="radio" name="${field.name}" value="${option.value}" ${option.selected ? 'checked="checked"' : ''}/> ${option.label}</label><br />`;
          });
          break;


        case "select":
          html += `<label>${field.label}</label>`;
          html += `<select name="${field.name}">`;
          field.values.forEach(option => {
            html += `<option value="${option.value}" ${option.selected ? 'selected="selected"' : ''}>${option.label}</option>`;
          });
          html += `</select><br />`;
          break;

        case "textarea":
          html += `<label>${field.label}</label>`;
          html += `<textarea style="display: block; margin-top: 7px;" placeholder="${field.placeholder || ''}">${field.value || ''}</textarea><br />`;
          break;

        case "button":
          html += `<button style="display: block;" type="button">${field.label}</button>`;
          break;
        case "label":
          html += `<label>${field.label}</label><br />`;
          break;
        default:
          html += `<div>Unsupported field type: ${field.type}</div>`;
      }

    });
    html += "</form></body></html>";
    return html;
  };

  render() {
    return (
      <>
        <div id="fb-editor" ref={this.fb} />
        <button
          onClick={this.handleSave}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Save Layout
        </button>

        <button
          onClick={this.handleLoad}
          style={{
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Load Layout
        </button>

        <button
          onClick={this.handlePublish}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Publish
        </button>
      </>
    );
  }
}

function App() {
  return (
    <div>
      <FormBuilder />
    </div>
  );
}

export default App;
