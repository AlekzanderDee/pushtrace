// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

import urlSet from './utils/urlManager';
import { hideNavbarAC, showNavbarAC } from './redux/actions/navbar';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};


export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  const hideNavbar = (location, replaceWith) => {
    store.dispatch(hideNavbarAC());
  };

  const showNavbar = (location, replaceWith) => {
    store.dispatch(showNavbarAC());
  };

  return [
    {
      path: '/',
      getIndexRoute(nextState, cb) {
        const importModules = Promise.all([
          import('components/rootPage'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: urlSet.placeholder,
      name: 'placeholder',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/placeholder'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: urlSet.signedUp,
      name: 'signedUp',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/email_confirmation_sent'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.emailConf,
      name: 'emailConf',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/reducers/emailConfirmation'),
          import('redux/sagas/emailConfirmation'),
          import('containers/email_confirmation'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('emailConfirmation', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.requestPasswordReset,
      name: 'requestPasswordReset',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/sagas/auth'),
          import('containers/requestResetPassword'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.passwordResetSent,
      name: 'passwordResetSent',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        import('containers/passwordResetSent')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },

    {
      path: urlSet.passwordReset,
      name: 'passwordReset',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/sagas/auth'),
          import('containers/resetPassword'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.projects,
      name: 'projects',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/reducers/projects'),
          import('redux/sagas/projects'),
          import('containers/projects/projectList/projectList'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('projects', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      name: 'projectsContainer',
      childRoutes: [
        {
          path: urlSet.projectUsers,
          name: 'projectUsers',
          getComponent(nextState, cb) {
            import('containers/projects/projectUsers/projectUsers')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
        {
          path: urlSet.projectTraces,
          name: 'projectTraces',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('redux/reducers/traces'),
              import('redux/sagas/traces'),
              import('containers/Traces/traces'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([traceReducer, traceSagas, component]) => {
              injectReducer('traces', traceReducer.default);
              injectSagas(traceSagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: urlSet.projectInfo,
          name: 'projectInfo',
          getComponent(nextState, cb) {
            import('containers/projects/projectInfo/projectInfo')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },
      ],
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/reducers/projects'),
          import('redux/sagas/projects'),
          import('containers/projects/projectContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('projects', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.accountSettings,
      name: 'accountSettings',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/reducers/user'),
          import('redux/sagas/user'),

          import('redux/sagas/auth'),

          import('redux/reducers/billingPlan'),
          import('redux/sagas/billingPlan'),

          import('redux/reducers/card'),
          import('redux/sagas/card'),

          import('containers/accountSettings/accountSettings'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([userReducer, UserSagas,
                             authSagas,
                             billingPlanReducer, billingPlanSagas,
                             cardReducer, cardSagas,
                             component]) => {
          injectReducer('user', userReducer.default);
          injectSagas(UserSagas.default);

          injectSagas(authSagas.default);

          injectReducer('billingPlan', billingPlanReducer.default);
          injectSagas(billingPlanSagas.default);

          injectReducer('card', cardReducer.default);
          injectSagas(cardSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.signOut,
      name: 'signOut',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/sagas/auth'),
          import('containers/signOut'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.signIn,
      name: 'signIn',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/sagas/auth'),
          import('containers/signIn'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.signUp,
      name: 'signUp',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/sagas/auth'),
          import('containers/signUp'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: urlSet.inviteAccept,
      name: 'inviteAccept',
      onEnter: hideNavbar,
      onLeave: showNavbar,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('redux/sagas/auth'),
          import('containers/inviteAccept/inviteAccept'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },

  ];
}
