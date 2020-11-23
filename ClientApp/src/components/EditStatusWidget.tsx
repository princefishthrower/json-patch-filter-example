import * as React from 'react';
import { EditStatus } from '../enums/EditStatus';

export interface IEditStatusWidgetProps {
    status: EditStatus;
}

export function EditStatusWidget(props: IEditStatusWidgetProps) {
    switch (props.status) {
        case EditStatus.Idle:
            return <></>
        case EditStatus.Saving:
            return <div className="text-muted pt-2"><span role="img" aria-label="Saving">🔄</span> Saving...</div>;
        case EditStatus.Saved:
            return <div className="text-muted pt-2"><span role="img" aria-label="Green Check">✅</span> Saved!</div>;
        case EditStatus.Error:
            return <div className="text-muted pt-2"><span role="img" aria-label="Explode">💥</span> There was an error saving!</div>;
        default:
            throw Error(`Status not handled ${props.status}.`);
    }
}
