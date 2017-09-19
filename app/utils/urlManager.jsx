const urlMap = {
    signedUp:               '/signed-up',
    emailConf:              '/email-confirmation/:confirmationId',
    requestPasswordReset:   '/password/reset',
    passwordResetSent:      '/password/reset/sent',
    passwordReset:          '/password/reset/:id/:token',
    projects:               '/projects',
    projectUsers:           '/projects/:projectId/users',
    projectTraces:          '/projects/:projectId/traces',
    projectInfo:            '/projects/:projectId/info',
    accountSettings:        '/account',
    signOut:                '/signout',
    signIn:                 '/signin',
    signUp:                 '/signup',
    inviteAccept:           '/invites/:inviteId/accept',

    placeholder: '/placeholder',
}


export default urlMap
