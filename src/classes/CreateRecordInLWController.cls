public with sharing class CreateRecordInLWController {
    @AuraEnabled
    public static String createRecord(String firstName, String lastName, String email){
        try {
            if(String.isNotEmpty(lastName)){
                Contact contact = new Contact();
                contact.LastName = lastName;
                contact.FirstName = firstName;
                Contact.Email = email;
                Insert contact;
                String Name = '';
                if(String.isNotEmpty(contact.FirstName)){
                    Name = contact.FirstName;
                }
                Name += ' ' +lastName;
                return 'Contact "'+ Name +'" was created.';
            }

        } catch (Exception exp) {
            System.debug('Exception message : '+exp.getMessage()+' At Line number : '+exp.getLineNumber());
        }
        return null;
    }
}
