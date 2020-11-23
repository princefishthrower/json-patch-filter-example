import React, { useEffect, useState } from 'react';
import FieldEditor from './components/FieldEditor';
import './custom.css'
import { FieldEditorType } from './enums/FieldEditorType';
import WidgetModel from './interfaces/WidgetModel';
import { ApiService } from './services/ApiService';

export default function App() {
  // ID hardcoded here as example
  const id = "00dd1425-bfc7-4a60-b96b-de080c8c82db";
  const [widget, setWidget] = useState<WidgetModel | null>(null);
  const apiService = new ApiService(`widget/${id}`);

  const fetchWidget = async () => {
    const model = await apiService.get<WidgetModel>();  
      setWidget(model);                 
  }

  useEffect(() => {
    if (widget === null) {
      fetchWidget();
    }
  })

  if (widget === null) {
    return <p>Loading...</p>
  }
  
  return (
    <div className="container-fluid">
      <div className="row p-4">
        <div className="col-md-6">
          <p className="text-muted">Editing Widget ID <b>{widget.id}</b></p>
          <FieldEditor
            id={widget.id}
            value={widget.title}
            type={FieldEditorType.Input}
            label="Titel:"
            propertyName="Title"
            endpoint={`widget/${id}`}
          />
          <FieldEditor
            id={widget.id}
            value={widget.description}
            type={FieldEditorType.Textarea}
            label="Description:"
            propertyName="Description"
            endpoint={`widget/${id}`}
          />
        </div>
      </div>
    </div>
  );
}
