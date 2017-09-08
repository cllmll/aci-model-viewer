/*
*   LICENSE
*   Copyright (c) 2015-2017, Simon Birtles http://linkedin.com/in/simonbirtles
*   All rights reserved.
*   Dual licensed under the MIT and GPL licenses.
*/


1. Open apic-comms.js and change login details, app will prompt for them but wont save them between sessions, this will setup defautl fields.

2. Use the link "chrome(no sec)" to open Chrome with web security disabled, this is due to cross site scripting and HTTPS restrictions.

3. Open a tab in the chrome session and enter the APIC IP and accept the invalid certificate (only required if the APIC has the default self signed cert - if a public signed one has been installed then this does not need to be done)

4. Open a tab and browse to the "dtree" folder and load "d3treeDyn1.html"

5. Vaidate login details and click submit, the app should login to the APIC.