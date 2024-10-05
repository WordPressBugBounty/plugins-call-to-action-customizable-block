import React, { Fragment } from 'react';
import {
    InspectorControls,
    MediaUpload,
    RichText,
    PanelColorSettings,
    AlignmentToolbar,
    BlockControls
} from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    Button,
    SelectControl,
    RangeControl,
    TextControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Edit = (props) => {
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
        },
        setAttributes
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

    const onSelectImage = (media) => {
        setAttributes({
            imageUrl: media.url,
        });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Color Settings')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Color Settings')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: BGColor,
                                onChange: (colorValue) => setAttributes({ BGColor: colorValue }),
                                label: __('Background Color'),
                            },
                            {
                                value: forColor,
                                onChange: (colorValue) => setAttributes({ forColor: colorValue }),
                                label: __('Text Color'),
                            },
                            {
                                value: buttonColor,
                                onChange: (colorValue) => setAttributes({ buttonColor: colorValue }),
                                label: __('Button Color'),
                            },
                        ]}
                    />
                </PanelBody>
                <PanelBody title={__('Button Settings')} initialOpen={false}>
                    <ToggleControl
                        label={__('Open In New Page')}
                        checked={newpage}
                        onChange={(value) => setAttributes({ newpage: value })}
                    />
                    <RichText
                        className="ctaButtonLink"
                        tagName="text"
                        onChange={(value) => setAttributes({ link_url: value })}
                        value={link_url}
                        placeholder={__('http://')}
                    />
                </PanelBody>
                <PanelBody title={__('Style Box')} initialOpen={false}>
                    <RangeControl
                        label={__('Padding')}
                        value={padding}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(value) => setAttributes({ padding: value })}
                    />
                    <SelectControl
                        label={__('Border Style')}
                        value={BorderStyle}
                        options={[
                            { label: 'hidden', value: 'hidden' },
                            { label: 'dashed', value: 'dashed' },
                            { label: 'dotted', value: 'dotted' },
                            { label: 'double', value: 'double' },
                        ]}
                        onChange={(value) => setAttributes({ BorderStyle: value })}
                    />
                    <AlignmentToolbar
                        value={textalign}
                        onChange={(value) => setAttributes({ textalign: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Background Image')} initialOpen={false}>
                    <MediaUpload
                        onSelect={onSelectImage}
                        type="image"
                        value={imageUrl}
                        render={({ open }) => (
                            <Button className="button button-large" onClick={open}>
                                {!imageUrl ? __('Pick an image') : <img src={imageUrl} alt={__('Background Image')} />}
                            </Button>
                        )}
                    />
                </PanelBody>
            </InspectorControls>
            <div id="bgimageWrap" style={block_style}>
                <RichText
                    className="callToAction"
                    tagName="div"
                    onChange={(value) => setAttributes({ calltoactionText: value })}
                    value={calltoactionText}
                    placeholder={__('Call To Action Text...')}
                />
                <RichText
                    className="callToActionButton"
                    tagName="div"
                    onChange={(value) => setAttributes({ link_text: value })}
                    value={link_text}
                    style={buttonStyle}
                    target={newpage ? '_blank' : '_self'}
                    placeholder={__('Button text')}
                />
            </div>
        </Fragment>
    );
};

export default Edit;
