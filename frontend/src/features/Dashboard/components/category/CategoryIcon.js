import * as React from 'react';
export default function CategoryIcon({classIcon}) {
    return (
        <div className="preview-thumbnail">
            <div style={{height: 40 + 'px', width: 40 + 'px'}} className={"preview-icon " + classIcon}>
            </div>
        </div>
    );
}