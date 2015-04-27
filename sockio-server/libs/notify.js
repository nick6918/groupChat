exports.options = {
    cert: 'cert.pem',                 /* Certificate file path */
    certData: null,                   /* String or Buffer containing certificate data, if supplied uses this instead of cert file path */
    key:  null,//'key.pem',                  /* Key file path */
    keyData: null,                    /* String or Buffer containing key data, as certData */
    passphrase: null,                 /* A passphrase for the Key file */
    ca: null,                         /* String or Buffer of CA data to use for the TLS connection */
    pfx: null,                        /* File path for private key, certificate and CA certs in PFX or PKCS12 format. If supplied will be used instead of certificate and key above */
    pfxData: null,                    /* PFX or PKCS12 format data containing the private key, certificate and CA certs. If supplied will be used instead of loading from disk. */
    gateway: 'gateway.sandbox.push.apple.com',/* gateway address */
    port: 2195,                       /* gateway port */
    rejectUnauthorized: true,         /* Value of rejectUnauthorized property to be passed through to tls.connect() */
    enhanced: true,                   /* enable enhanced format */
    errorCallback: undefined,         /* Callback when error occurs function(err,notification) */
    cacheLength: 100,                 /* Number of notifications to cache for error purposes */
    autoAdjustCache: true,            /* Whether the cache should grow in response to messages being lost after errors. */
    connectionTimeout: 0              /* The duration the socket should stay alive with no activity in milliseconds. 0 = Disabled. */
};
exports.feedbackoptions = {
    cert: 'cert.pem',                   /* Certificate file */
    certData: null,                     /* Certificate file contents (String|Buffer) */
    key:  null,//'key.pem',                    /* Key file */
    keyData: null,                      /* Key file contents (String|Buffer) */
    passphrase: null,                   /* A passphrase for the Key file */
    ca: null,                           /* Certificate authority data to pass to the TLS connection */
    pfx: null,                          /* File path for private key, certificate and CA certs in PFX or PKCS12 format. If supplied will be used instead of certificate and key above */
    pfxData: null,                      /* PFX or PKCS12 format data containing the private key, certificate and CA certs. If supplied will be used instead of loading from disk. */
    address: 'feedback.push.apple.com', /* feedback address */
    port: 2196,                         /* feedback port */
    feedback: false,                    /* enable feedback service, set to callback */
    batchFeedback: false,               /* if feedback should be called once per connection. */
    interval: 3600                      /* interval in seconds to connect to feedback service */
};