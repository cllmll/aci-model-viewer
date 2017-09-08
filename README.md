


Cisco ACI APIC Model Viewer
===========================

The ACI Model Viewer vidualises the APIC configuration through the use of graphs illustrating the configuration of the APIC. The model viewer has been used and added to over the last few years and hopefully will be of help to the community as it has been to me and my colleagues.  


Uses
====

   * Assists in learning how the model has been implemented
   * Enables troubelshooting where compnents have not been configured correctly
   * Assists in writing scripts against the APIC by drilling down into the model to find data or objects
   
   
 Important Notes
 ===============
 
 As this has been built over time for my use there are certain restrictions (or untested uses) of the code. 
 
    * The code uses CORS, so to avoid errors and the script being denied the browser web security must be disabled. In Chrome this is
      done by starting Chrome with the --disable-web-security switch. A Windows Chrome lnk file has been provided to start chrome in     
      this mode.
    * Due to the operation of XHR in JS and that the APIC in HTTPS mode only uses a locally generated certificate, XHR will fail to 
      permit the operation connecting to the APIC due to the invalid certificate. This would not be an issue where the APIC has had
      public signed certificate installed. To workaround this issuee, when the browser is first opened without web security as
      discussed, open a page to the APIC and accept the locally signed certificate. Once this is done, then open up the model viewer
      html page (index.html)
   
Author
======
  Simon Birtles http://linkedin.com/in/simonbirtles



Licence
========
  * Copyright (c) 2015-2017, 
  * All rights reserved.
  * Dual licensed under the MIT and GPL licenses.

