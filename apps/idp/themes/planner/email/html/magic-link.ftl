<#import "template-without-decorator.ftl" as layout>
<@layout.emailLayout>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                        <tbody>
                        <tr>
                            <td align="center" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                                <div style="font-family:Manrope, open Sans Helvetica, Arial, sans-serif;font-size:18px;line-height:1;text-align:center;color:#000000;">${kcSanitize(msg("emailMagicLinkIntro"))}</div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" vertical-align="middle" style="font-size:0px;padding:30px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                    <tr>
                                        <td align="center" bgcolor="#0e686b" role="presentation" style="border:none;border-radius:10px;cursor:auto;mso-padding-alt:10px 25px;background:#0e686b;" valign="middle">
                                            <a href="${link}" style="display:inline-block;background:#0e686b;color:#ffffff;font-family:Manrope, open Sans Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:10px;" target="_blank"> ${kcSanitize(msg("emailMagicLinkButton"))} </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size:0px;padding:10px 25px;padding-top:40px;padding-right:25px;padding-left:25px;word-break:break-word;">
                                <div style="font-family:Manrope, open Sans Helvetica, Arial, sans-serif;font-size:12px;line-height:1;text-align:center;color:black;">${kcSanitize(msg("emailMagicLinkCopyHelp"))} <br>
                                    <a href="${link}" style="text-decoration: none; color: inherit;">${link}</a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
        </tr>
        </tbody>
    </table>
</@layout.emailLayout>


