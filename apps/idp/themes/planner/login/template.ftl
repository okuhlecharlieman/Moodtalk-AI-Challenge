<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
    <!DOCTYPE html>
    <html class="${properties.kcHtmlClass!}"<#if realm.internationalizationEnabled> lang="${locale.currentLanguageTag}"</#if>>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <#if properties.meta?has_content>
            <#list properties.meta?split(' ') as meta>
                <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
            </#list>
        </#if>
        <title>${msg("loginTitle",(realm.displayName!''))}</title>
        <link rel="icon" href="${url.resourcesPath}/public/favicon.ico" />
        <#if properties.stylesCommon?has_content>
            <#list properties.stylesCommon?split(' ') as style>
                <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
            </#list>
        </#if>
        <#if properties.styles?has_content>
            <#list properties.styles?split(' ') as style>
                <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
            </#list>
        </#if>
        <#if properties.scripts?has_content>
            <#list properties.scripts?split(' ') as script>
                <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
            </#list>
        </#if>
        <#if scripts??>
            <#list scripts as script>
                <script src="${script}" type="text/javascript"></script>
            </#list>
        </#if>
        <#if authenticationSession??>
            <script type="module">
                import { checkCookiesAndSetTimer } from "${url.resourcesPath}/js/authChecker.js";

                checkCookiesAndSetTimer(
                    "${authenticationSession.authSessionId}",
                    "${authenticationSession.tabId}",
                    "${url.ssoLoginInOtherTabsUrl}"
                );
            </script>
        </#if>
        <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css">

    </head>

    <body class="${properties.kcBodyClass!}">
    <div class="content full-width-content">
        <div class="text-center container-md">
            <div class="row">
                <div class="col-lg-6 col-md-12 mx-auto">
                    <div class="d-flex flex-column min-vh-100 justify-content-center">
                        <div class="bg-white p-5 p-md-6 shadow rounded text-center mt-4">
                            <img src="https://static.moodtalk.ch/logo.svg" alt="logo" class="w-25 mb-5" />
                            <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
                                <#if displayRequiredFields>
                                    <div class="${properties.kcContentWrapperClass!}">
                                        <div class="col-md-12">
                                            <h2 id="kc-page-title"><#nested "header"></h2>
                                        </div>
                                    </div>
                                <#else>
                                    <h2 id="kc-page-title"><#nested "header"></h2>
                                </#if>
                            <#else>
                                <#if displayRequiredFields>
                                    <div class="${properties.kcContentWrapperClass!}">
                                        <div class="${properties.kcLabelWrapperClass!} subtitle">
                                            <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                                        </div>
                                        <div class="col-md-10">
                                            <#nested "show-username">
                                            <div id="kc-username" class="${properties.kcFormGroupClass!}">
                                                <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                                <a id="reset-login" href="${url.loginRestartFlowUrl}" aria-label="${msg("restartLoginTooltip")}">
                                                    <div class="kc-login-tooltip">
                                                        <i class="${properties.kcResetFlowIcon!}"></i>
                                                        <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                                    </div>
                                                </a>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                <#else>
                                    <#nested "show-username">
                                    <div id="kc-username" class="${properties.kcFormGroupClass!}">
                                        <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                                        <a id="reset-login" href="${url.loginRestartFlowUrl}" aria-label="${msg("restartLoginTooltip")}">
                                            <div class="kc-login-tooltip">
                                                <i class="${properties.kcResetFlowIcon!}"></i>
                                                <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                    <hr />
                                </#if>
                            </#if>

                            <#-- App-initiated actions should not see warning messages about the need to complete the action -->
                            <#-- during login.                                                                               -->
                            <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                                <div class="alert-${message.type} ${properties.kcAlertClass!} pf-m-<#if message.type = 'error'>danger<#else>${message.type}</#if>">
                                    <div class="pf-c-alert__icon">
                                        <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                                        <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                                        <#if message.type = 'danger'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                                        <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                                    </div>
                                    <span class="${properties.kcAlertTitleClass!}">${kcSanitize(message.summary)?no_esc}</span>
                                </div>
                            </#if>

                            <#nested "form">

                            <#if displayInfo>
                                <hr class="mt-6"/>
                                <div id="kc-info" class="${properties.kcSignUpClass!}">
                                    <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                                        <#nested "info">
                                    </div>
                                </div>
                            </#if>

                            <#if auth?has_content && auth.showTryAnotherWayLink()>
                                <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post">
                                    <div class="${properties.kcFormGroupClass!}">
                                        <input type="hidden" name="tryAnotherWay" value="on"/>
                                        <a href="#" id="try-another-way"
                                           onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                                    </div>
                                </form>
                            </#if>

                            <#nested "socialProviders">
                        </div>
                        <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
                            <div class="mt-6">
                                <div class="d-flex justify-content-center">
                                <#list locale.supported as l>
                                    <span class="px-2 fw-semibold cursor-pointer text-primary-hover text-secondary">
                                        <a class="text-primary-hover text-secondary text-decoration-none" href="${l.url}">${l.label}</a>
                                    </span>
                                </#list>
                                </div>
                            </div>
                        </#if>
                        <p class="mt-4 text-gray-dark d-flex gap-6 justify-content-center">
                            <span>Powered by Moodtalk</span>
                            <a
                                    class="text-gray-dark"
                                    href="https://moodtalk.ch/datenschutzerklaerung"
                                    i18n-href="@@app.data-privacy.link"
                                    i18n="@@app.data-privacy"
                                    target="_blank"
                            >Datenschutzerklärung</a
                            >
                        </p>
                    </div>
                </div>
            </div>
    </div>

    <!-- load font observer to avoid flash of unstyled text -->
    <script src="${url.resourcesPath}/scripts/fontfaceobserver.js" type="text/javascript"></script>
    <script type="text/javascript">
        const manropeObserver = new FontFaceObserver('Manrope');
        manropeObserver.load().then(function(){
            document.documentElement.className += " fonts-loaded";
            // As the class `fonts-loaded` changes the display from none to block, we have to retrigger the autofocus
            document.querySelector("[autofocus]").focus();
        });
    </script>
    <!-- end of font observer -->
    </body>
    </html>
</#macro>