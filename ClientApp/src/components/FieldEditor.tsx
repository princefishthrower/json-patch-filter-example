import * as React from 'react';
import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { EditStatus } from '../enums/EditStatus';
import { EditStatusWidget } from './EditStatusWidget';
import { ApiService } from '../services/ApiService';
import JSONPatchOperation from '../interfaces/JSONPatchOperation';
import JSONPatchOperationType from '../enums/JSONPatchOperationType';
import { FieldEditorType } from '../enums/FieldEditorType';

interface IFieldEditorProps {
    value: string;
    id: string;
    label: string;
    propertyName: string;
    endpoint: string;
    type: FieldEditorType;
    showLabel?: boolean;
    created?: Date;
}

export default function FieldEditor(props: IFieldEditorProps) {
    const { id, value, label, showLabel, propertyName, endpoint, type } = props;
    const [currentValue, setCurrentValue] = useState<string>(value);
    const [lastValue, setLastValue] = useState<string>(value);
    const [editState, setEditState] = useState<EditStatus>(EditStatus.Idle);
    const debouncedValue = useDebounce(currentValue, 500);
    const apiService = new ApiService(endpoint);

    useEffect(() => {
        async function saveValue() {
            // if they haven't picked an image yet, we can't update its title or comments (need an id to PATCH)
            if (id === '') {
                return;
            }
            // Make sure we have a value (user has entered something in input)
            if (debouncedValue !== lastValue) {
                setLastValue(debouncedValue);

                // Dynamically create the JSON patch object based on the field changed
                let requestObject: JSONPatchOperation[] = [{
                    op: JSONPatchOperationType.Replace,
                    path: propertyName,
                    value: debouncedValue
                }];

                await apiService.patch(
                    requestObject,
                    () => {
                        setEditState(EditStatus.Saved);
                        setTimeout(() => setEditState(EditStatus.Idle), 1500)
                    },
                    (error) => {
                        setEditState(EditStatus.Error);
                    }
                );
            }
        }
        saveValue();
    });

    // Unique key for identifying this field
    const fieldKey = `key_${id}_${propertyName}`;
    const cssClass = `form-control ${editState === EditStatus.Error ? ' is-invalid' : ''}`;

    return (
        <div className="form-group">
            {(showLabel || showLabel === undefined) &&
                <label className="text-muted" htmlFor={fieldKey}>{label}</label>
            }
            {type === FieldEditorType.Input && (
                <input
                    type="text"
                    id={fieldKey}
                    placeholder={label}
                    name={fieldKey}
                    className={cssClass}
                    value={currentValue ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEditState(EditStatus.Saving); setCurrentValue(e.target.value) }}
                />
            )}
            {type === FieldEditorType.Textarea && (
                <textarea
                    id={fieldKey}
                    placeholder={label}
                    name={fieldKey}
                    className={cssClass}
                    value={currentValue ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setEditState(EditStatus.Saving); setCurrentValue(e.target.value) }}
                />
            )}
            <EditStatusWidget status={editState} />
        </div>
    );
}
