sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Dialog, Text,Button) {
        "use strict";
        var userData = {
            results: [                      //Absolute path and Aggregation Binding
                {
                    "username": "harshadapatil",              //Relative path and Element Binding
                    "firstname": "Harshada",
                    "lastname": "Patil",
                    "gender": "Female",
                    "active": "X"
                },
                {
                    "username": "amrutashedge",
                    "firstname": "Amruta",
                    "lastname": "Shedge",
                    "gender": "Female",
                    "active": ""
                },
                {
                    "username": "dishakhandalkar",
                    "firstname": "Disha",
                    "lastname": "Khandalkar",
                    "gender": "Female",
                    "active": "X"
                },
                {
                    "username": "sharayuthombre",
                    "firstname": "Sharayu",
                    "lastname": "Thombre",
                    "gender": "Female",
                    "active": ""
                }

            ]
        }

        return Controller.extend("ui5training2.controller.View1", {
            onInit: function () {

            },
            onAfterRendering: function () {
                console.table(userData);

                //step 1 - define a model -> JSON/OData/Resource
                var oModel = new JSONModel();

                //step 2 - set the data in the model
                oModel.setData(userData);

                //step 3 - set the model to the view
                this.getView().setModel(oModel);

                //test
                console.table(this.getView().getModel().getData())
            },
            onLineItemPress: function (oEvent) {
                // step 1 - get the row data which was clicked
                var bindedPath = oEvent.getSource().getBindingContext().getPath();

                // step 2 - get the data from the model by passing the bindedPath
                var data = this.getView().getModel().getObject(bindedPath);
                // MessageBox.show(data.lastname);

                //Dialog
                if (!this.oDialog) {
                    this.oDialog = new Dialog({
                        id: "idDialog",
                        title: "Display User Details",
                        content: new Text({
                            text: "{username}"
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press:function(){
                                this.oDialog.close();
                            }.bind(this)
                        })
                    });
                }
                // step 3 - set the binding context to the dialog
                this.oDialog.setBindingContext(oEvent.getSource().getBindingContext());

                // step 4 - add dialog as a dependent in the view
                this.getView().addDependent(this.oDialog);
                this.oDialog.open();
            }
        });
    });
