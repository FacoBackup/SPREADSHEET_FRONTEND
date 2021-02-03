import React from 'react'
import axios from 'axios';
import {DefaultButton, Modal, PrimaryButton} from 'office-ui-fabric-react';
import Host from '../../../../Host'
import {FontSizes, FontWeights} from '@fluentui/theme';
import Cookies from 'universal-cookie';
import "../../../shared/styles/TopicStyles.css"
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import "../../styles/GroupOptionsStyle.css"

class GroupAboutComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            group: params.group,
            imageURL: null,
            backgroundImageURL: null,
            about: null,
            imageModal: false,
            backgroundModal: false
        }
        this.handleChange = this.handleChange.bind(this)
    }


    getFile(event, name) {

        this.setState({
            imageURL: null
        })

        let reader = new FileReader();

        if (!event[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            alert('not an image')
            this.setState({
                imageURL: null
            })
        } else {
            reader.readAsDataURL(event[0]);
            reader.onload = () => {
                this.setState({
                    [name]: reader.result
                })
            }
        }
    }

    renderModal(option) {
        switch (option) {
            case 0: {
                if (this.state.imageModal === true) {
                    return (
                        <Modal
                            titleAriaId={"TESTE"}
                            isOpen={true}
                            onDismiss={true}
                            isBlocking={false}


                        >
                            <div className='modal_container'>
                                <div className="modal_title_component">
                                    <h2>Upload a new image</h2>
                                </div>
                                <div className="modal_top_component"
                                     style={{display: 'flex', justifyContent: 'center'}}>
                                    <input type="file" name="file"
                                           onChange={event => this.getFile(event.target.files, "imageURL")}/>
                                </div>
                                <div className="modal_middle_component">
                                    {this.renderSelectedImage(0)}
                                </div>
                                <div className="modal_bottom_component"
                                     style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {this.state.imageURL === null ?
                                        <DefaultButton text="Cancel" onClick={() => this.setState({
                                            imageModal: false,
                                            backgroundModal: false
                                        })}/> :
                                        <DefaultButton text="Remove Image" onClick={() => this.setState({
                                            imageModal: false,
                                            backgroundModal: false,
                                            imageURL: null
                                        })}/>
                                    }

                                    <PrimaryButton text="Choose" onClick={() => this.setState({
                                        imageModal: false,
                                        backgroundModal: false

                                    })}/>
                                </div>
                            </div>
                        </Modal>
                    )

                } else
                    break
            }
            case 1: {
                if (this.state.backgroundModal === true) {
                    return (
                        <Modal
                            titleAriaId={"TESTE"}
                            isOpen={true}
                            onDismiss={true}
                            isBlocking={false}

                            containerClassName={"contentStyles.container"}
                        >
                            <div className='modal_container'>
                                <div className="modal_title_component">
                                    <h2>Upload a new background image</h2>
                                </div>
                                <div className="modal_top_component"
                                     style={{display: 'flex', justifyContent: 'center'}}>
                                    <input type="file" name="file"
                                           onChange={event => this.getFile(event.target.files, "backgroundImageURL")}/>
                                </div>
                                <div className="modal_middle_component">
                                    {this.renderSelectedImage(1)}
                                </div>
                                <div className="modal_bottom_component"
                                     style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {this.state.imageURL === null ?
                                        <DefaultButton text="Cancel" onClick={() => this.setState({
                                            imageModal: false,
                                            backgroundModal: false
                                        })}/> :
                                        <DefaultButton text="Remove Image" onClick={() => this.setState({
                                            imageModal: false,
                                            backgroundModal: false,
                                            backgroundImageURL: null
                                        })}/>
                                    }

                                    <PrimaryButton text="Choose" onClick={() => this.setState({
                                        imageModal: false,
                                        backgroundModal: false

                                    })}/>
                                </div>
                            </div>
                        </Modal>
                    )

                } else
                    break
            }
            default: {
                alert("Some error occurred.")

            }
        }

    }

    renderSelectedImage(option) {
        switch (option) {
            case 0: {
                if (this.state.imageURL !== null)
                    return (
                        <div style={{
                            display: 'grid',
                            alignContent: 'center',
                            justifyContent: 'center',
                            paddingLeft: '.3vw',
                            paddingRight: '.3vw'
                        }}>
                            <img style={{margin: 'auto', width: '300px', borderRadius: '8px'}} alt="message"
                                 src={this.state.imageURL}/>
                        </div>
                    )
                else
                    break
            }
            case 1: {
                if (this.state.backgroundImageURL !== null)
                    return (
                        <div style={{
                            display: 'grid',
                            alignContent: 'center',
                            justifyContent: 'center',
                            paddingLeft: '.3vw',
                            paddingRight: '.3vw'
                        }}>
                            <img style={{margin: 'auto', width: '300px', borderRadius: '8px'}} alt="message"
                                 src={this.state.backgroundImageURL}/>
                        </div>
                    )
                else
                    break
            }
            default: {
                return null
            }
        }

    }

    renderImage(imageURL) {
        if (typeof imageURL !== 'undefined')
            return (
                <div className="topic_image_container">
                    <img style={{borderRadius: '8px', width: '100%', height: '100%'}} alt="Topic" src={imageURL}/>
                </div>
            )
    }

    handleChange(event) {

        this.setState({
            about: event.target.value
        })
    }

    async submitChanges() {
        alert(this.state.group.groupID)
        await axios({
            method: 'put',
            url: Host() + 'api/update/group',
            headers: {"Authorization": 'Bearer ' + (new Cookies()).get("JWT")},
            data: {
                groupID: this.state.group.groupID,
                about: this.state.about,
                imageURL: this.state.imageURL,
                backgroundImageURL: this.state.backgroundImageURL
            }
        }).then(res => {
            window.location.reload()
        })
            .catch(error => {
                console.log(error)
            });
    }

    render() {

        return (
            <div className="dedicated_content_container"
                 style={{display: 'grid', alignContent: 'center', rowGap: '2vh'}}>
                <div>
                    <p style={{
                        textAlign: 'center',
                        fontSize: FontSizes.size18,
                        fontWeight: FontWeights.regular
                    }}>Info</p>

                </div>
                <div className="group_about_container">
                    <p style={{textAlign: 'center', fontSize: FontSizes.size16, fontWeight: FontWeights.regular}}>About
                        this Group:</p>
                    <p style={{
                        textAlign: 'center',
                        fontSize: FontSizes.size14,
                        fontWeight: FontWeights.regular
                    }}>{this.state.group.about}</p>
                    {(this.state.group.role === "MODERATOR") ?
                        <TextField multiline onChange={this.handleChange} placeholder="About This Group"/> : null}
                </div>

                <div className="topic_image_container group_about_container">
                    <p style={{
                        textAlign: 'center',
                        fontSize: FontSizes.size16,
                        fontWeight: FontWeights.regular
                    }}>Group Pic</p>
                    {(this.state.group.role === "MODERATOR") ?
                        <DefaultButton style={{margin: 'auto'}} text="Upload a new image" onClick={() => this.setState({
                            backgroundModal: false,
                            imageModal: true
                        })}/> : <p style={{
                            textAlign: 'center',
                            fontSize: FontSizes.size16,
                            fontWeight: FontWeights.regular
                        }}>Nothing here yet</p>}
                    {this.renderModal(0)}
                    {this.renderImage((this.state.imageURL !== null) ? this.state.imageURL : this.state.group.imageURL)}

                </div>
                <div className="topic_image_container group_about_container">
                    <p style={{
                        color: '',
                        textAlign: 'center',
                        fontSize: FontSizes.size16,
                        fontWeight: FontWeights.regular
                    }}>Group Background</p>
                    {(this.state.group.role === "MODERATOR") ?
                        <DefaultButton style={{margin: 'auto'}} text="Upload a new background image"
                                       onClick={() => this.setState({
                                           backgroundModal: true,
                                           imageModal: false
                                       })}/> : <p style={{
                            textAlign: 'center',
                            fontSize: FontSizes.size16,
                            fontWeight: FontWeights.regular
                        }}>Nothing here yet</p>}
                    {this.renderModal(1)}
                    {this.renderImage((this.state.backgroundImageURL !== null) ? this.state.backgroundImageURL : this.state.group.backgroundImageURL)}
                </div>
                <div className="topic_image_container group_about_container">
                    {(this.state.group.role === "MODERATOR") ?
                        <DefaultButton style={{margin: 'auto'}} text="Submit Changes"
                                       onClick={() => this.submitChanges()}/> : null}
                </div>

            </div>

        )
    }
}

export default GroupAboutComponent
