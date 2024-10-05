import React from 'react';
import { RichText } from '@wordpress/block-editor';

const Save = (props) => {
    const {
        attributes: {
            calltoactionText,
            link_text,
            link_url,
            BGColor,
            buttonColor,
            forColor,
            padding,
            textalign,
            BorderStyle,
            imageUrl,
            newpage
        }
    } = props;

    const block_style = {
        backgroundColor: BGColor,
        color: forColor,
        padding: padding,
        textAlign: textalign,
        borderStyle: BorderStyle,
        backgroundImage: `url(${imageUrl})`,
    };

    const buttonStyle = {
        backgroundColor: buttonColor,
    };

    return (
        <div id="bgimageWrap" style={block_style}>
            <div>
                <RichText.Content
                    tagName="div"
                    className="callToAction"
                    value={calltoactionText}
                />
                <a
                    className="callToActionButton"
                    href={link_url}
                    target={newpage ? '_blank' : '_self'}
                    rel="noopener"
                    style={buttonStyle}
                >
                    <RichText.Content value={link_text} />
                </a> 
            </div>
        </div>
    );
};

export default Save;
