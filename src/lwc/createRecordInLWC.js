/* eslint-disable no-useless-return */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createRecord from '@salesforce/apex/CreateRecordInLWController.createRecord';

export default class CreateRecordInLWC extends LightningElement {
    /* Start varible declaration */
    @track email;
    @track lastName;
    @track firstName;
    /* End varible declaration */
    handleFirstName(event) {
        this.firstName = event.target.value;
    }
    handleLastName(event) {
        this.lastName = event.target.value;
    }
    handleEmailName(event) {
        this.email = event.target.value;
    }
    handleSaveClick() {
        /* Validating input field for bad input */
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
        if (allValid) {
            this.createRecordHandler();
        } else {
            return;
        }

    }
    /* Calling Apex method and a create contact record. */
    createRecordHandler() {
        try {
            createRecord({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email
                })
                .then(result => {
                    console.log(JSON.stringify(result));
                    if (result) {
                        const evt = new ShowToastEvent({
                            title: "Contact created",
                            message: result,
                            variant: "success"
                        });
                        this.dispatchEvent(evt);
                        this.handleCancelClick();
                    }
                })
                .catch(error => {
                    /* no console eslint(no-console) */
                    console.log("error message :: " + error.message);
                });
        } catch (error) {
            console.log("Exception message :: " + error.message);
        }
    }
    /* Cancel button functionality */
    handleCancelClick() {
        this.firstName = undefined;
        this.lastName = undefined;
        this.email = undefined;
    }

}