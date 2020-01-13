const TYPES = {
   VALIDATION: 'validation',
   GENERAL: 'general',
   LOGIN_WRONG_CREDENTIAL: 'login_wrong_credential',
   USER_DB_ERR: 'user_db_err',
   USER_CREATE: 'user_create',
   USER_UPDATE: 'user_update',
   USER_DELETE: 'user_delete'
}

const format = (type, info) => {
   return {
      errors: {
         type: type,
         info: info
      }
   }
}

module.exports = {
   TYPES: TYPES,
   format: format
}