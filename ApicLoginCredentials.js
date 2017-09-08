/*
*   LICENSE
*   Copyright (c) 2015-2017, Simon Birtles http://linkedin.com/in/simonbirtles
*   All rights reserved.
*   Dual licensed under the MIT and GPL licenses.
*/

 class ApicLoginCredentials
 {
    constructor()
    {
        this.createDialogBase();
        this.createDragActions();
        this.setupMessageWindow();
    }

    // all default stuff - no changes between dialogs except CSS stype names except span X close function
    createDialogBase()
    {

        var appDialog = d3.select("body")

        .append("div")
        .attr("id", "apic-login-modal")
        .classed("apic-login-modal", true)

        /**** Content Wrapper for Header, Body, Footer ****/
        .append("div")
        .attr("id", "apic-login-content")
        .classed("apic-login-content", true)


        /**** Header ****/
        .append("div")
            .attr("id", "apic-login-header")
            .classed("apic-login-header", true)

                /* close button */
                .append("span")
                    .classed("close", true)
                    .html("&times;")
                    .on("click", function() 
                    { 
                        d3.select("div#apic-login-modal").style("display", "none");  
                    })
                    .select(function(){return this.parentNode;}) // div -> header

                /* dialog title */
                .append("text")
                    .attr("id", "apic-login-title")
                    .text("dialog title")
                    .select(function(){return this.parentNode;}) // div -> header   


            /**** Body ****/
            .select(function(){return this.parentNode;}) // div -> content
            .append("div")
                .attr("id", "apic-login-body")
                .classed("apic-login-body", true)
                .append("text")
                    .text("Some text in the Modal Body")
                    .select(function(){return this.parentNode;}) // div -> body


            /**** Footer ****/
            .select(function(){return this.parentNode;}) // div -> content
            .append("div")
                .attr("id", "apic-login-footer")
                .classed("apic-login-footer", true)
                .append("text")
                    .text("");

    }

    // DRAGGER code - all default stuff - no changes between dialogs except CSS stype names
    createDragActions()
    {    
        var propContainer = d3.select("div#apic-login-content");
        var dragger = d3.select('div#apic-login-header');

        dragger
            .call(d3.drag() 
                .on("end", 
                    function(){ 
                            var dragger = d3.select('div#apic-login-header');
                            dragger.attr("mx", 0 )  
                            dragger.attr("my", 0 )  
                })

                .on("start", 
                    function() { 
                            var dragger = d3.select('div#apic-login-header');
                            //console.log("start-x", d3.mouse(this.parentNode.parentNode.parentNode)[0]);
                            // console.log("start-y", d3.mouse(this.parentNode.parentNode.parentNode)[1]);
                            // console.log("start-dx", propContainer.node().getBoundingClientRect().left );

                            dragger.attr("mx", d3.mouse(this.parentNode.parentNode.parentNode)[0] )  
                            dragger.attr("my", d3.mouse(this.parentNode.parentNode.parentNode)[1] )  
                            dragger.attr("dx", propContainer.node().getBoundingClientRect().left )  

                        })

                .on('drag', 
                    function() {
                            var g_x = d3.mouse(this.parentNode.parentNode.parentNode)[0];
                            var g_y = d3.mouse(this.parentNode.parentNode.parentNode)[1];
                            if(g_x < 0) { return; }

                            var dragger = d3.select('div#apic-login-header');
                            var mx = dragger.attr("mx")  ;
                            var my = dragger.attr("my")  ;

                            var calc = g_x - ( mx - dragger.attr("dx") );
                            propContainer.style('left', Math.max(0,calc) + 'px');
                            propContainer.style('top', Math.max(0, g_y -5) + 'px');    

                            // console.log("g_x", g_x, "mx", mx, "dx", dragger.attr("dx"), "calc", calc);

                        })
                    );
    }

    // specific setup 
    setupMessageWindow()
    {    
        ///////////////////////////////////////////////////////////////////////////////////////////////
        // Dialog Title (header)
        ///////////////////////////////////////////////////////////////////////////////////////////////
        d3.select("#apic-login-title").text("ACI APIC Login Credentials");        

        ///////////////////////////////////////////////////////////////////////////////////////////////
        // Dialog Body
        //////////////////////////////////////////////////////////////////////////////////////////////   
        d3.select("#apic-login-body").selectAll('*').remove();  // cleanup from last display of data
        var dBody = d3.select("#apic-login-body") // is a div
        
        // append a new main containing div
        var outerContainer = dBody.append("div").classed("apic-login-container", true);

        // create dialog items 
        // http/https
        // apic ip
        // apic login domain
        // username 
        // password

        /**** APIC Protocol HTTP/HTTPS ****/
        var tr = outerContainer.append("table").append("tbody").append("tr");
        tr.append("td").classed("attribute", true).append("text").text("Protocol:").style("padding-right", "10px");

        // TD
        var td = tr.append("td").classed("value", true);


        var d1 = td.append("div");
        d1.append("input").attr("id", "apicWebHttp").attr("type", "radio").attr("name", "webProtocol").style("display","inline");
        d1.append("text").text("http").style("display","inline").style("padding-right", "15px")

        d1.append("input").attr("id", "apicWebHttps").attr("type", "radio").attr("name", "webProtocol").style("display","inline");
        d1.append("text").text("https").style("display","inline")

        document.getElementById('apicWebHttp').value = "http";
        document.getElementById('apicWebHttps').value = "https";

        // if(webProtocol.search("https") !== -1){
        //      document.getElementById('apicWebHttps').checked = "checked";}
        //     else{
        //         document.getElementById('apicWebHttp').checked = "checked";}            


        /**** APIC IP ****/
        var tr = outerContainer.append("table").append("tbody").append("tr");
        tr.append("td").classed("attribute", true).append("text").text("APIC IP:");

        var fIpAddress = tr.append("td")
                                .classed("value", true)
                                .append("input")
                                    .attr("id", "apicIpAddress")
                                    .attr("type", "text")
                                    .on("focusout", this.ipAddressChanged.bind(this) );
        
        //document.getElementById('apicIpAddress').value = apicIP;    


        /**** APIC DOMAIN ****/
        tr = outerContainer.append("table").append("tbody").append("tr");
        tr.append("td").classed("attribute", true).append("text").text("Domain:");

        var fDomain = tr.append("td").classed("value", true)
                        .append("select").attr("id", "apicDomains").style("width", "173px");

        // fDomain.selectAll("option")
        //         .data(["defaultAuth"])
        //         .enter()
        //             .append("option")
        //             .text(function(d){return d;})


        /**** USERNAME ****/
        tr = outerContainer.append("table").append("tbody").append("tr");
        tr.append("td").classed("attribute", true).append("text").text("User ID:");

        var fUsername = tr.append("td").classed("value", true)
                            .append("input").attr("id", "apicUsername").attr("type", "text");
        
       // document.getElementById('apicUsername').value = username;


        /**** PASSWORD  ****/
        tr = outerContainer.append("table").append("tbody").append("tr");
        tr.append("td").classed("attribute", true).append("text").text("Password:");

        var fPassword = tr.append("td").classed("value", true)
                            .append("input").attr("id", "apicPassword").attr("type", "password");

        //document.getElementById('apicPassword').value = password;


        ///////////////////////////////////////////////////////////////////////////////////////////////
        // footer 
        //////////////////////////////////////////////////////////////////////////////////////////////
        d3.select("#apic-login-footer").selectAll('*').remove();
        var footer = d3.select("#apic-login-footer");

        /* submit button */
        footer.append("div")
            .classed("query-button", true)
            .on("click", this.submitCredentials.bind(this))
                .append("text")
                    .text("Submit");

        footer.append("div").classed("query-button-spacer", true)

        /* cancel button */
        footer.append("div")
        .classed("query-button", true)
        .on("click", 
            function()
            {
              d3.select("div#apic-login-modal").style("display", "none");  
            })

            .append("text")
                .text("Cancel");

        footer.append("div").classed("query-button-spacer", true)    

        return;
    }

    // shows window with current details (if any)
    getUserCredentials()
    {
        //http/https
        document.getElementById('apicWebHttp').value = "http";
        document.getElementById('apicWebHttps').value = "https";

        if(webProtocol.search("https") !== -1){
             document.getElementById('apicWebHttps').checked = "checked";}
            else{
                document.getElementById('apicWebHttp').checked = "checked";}
            

        // apic IP
        d3.select("input#apicIpAddress").style("color", "black");           // in case an error was prev. shown.
        document.getElementById('apicIpAddress').value = apicIP;

        // domains  ---> getApicLoginDomains()
        this.ipAddressChanged(true);

        var domainText = (apicLoginDomain === "" ? "DefaultAuth" : apicLoginDomain);
        var fDomain = d3.select("select#apicDomains");
        fDomain.selectAll("option")
            .data([domainText])
            .enter()
                .append("option")
                .text(function(d){return d;})

        // username 
        document.getElementById('apicUsername').value = username;

        // password
        document.getElementById('apicPassword').value = password;

        // show window
        d3.select("div#apic-login-modal").style("display", "block");     
        
         // center the dialog
         var contentDiv = d3.select("div#apic-login-content");
         contentDiv.style("left", 
                         function()
                                 {
                                     // console.log((window.innerWidth / 2));
                                     // console.log(((filterContentDiv.node().getBoundingClientRect().width /2)) + 'px');
                                     return ((window.innerWidth / 2) -  (contentDiv.node().getBoundingClientRect().width  /2)) + 'px';
                                 });
                                 contentDiv.style("top", 
                                 function()
                                         {
                                             // console.log((window.innerHeight / 2));
                                             // console.log(((filterContentDiv.node().getBoundingClientRect().height /2)) + 'px');
                                             return ((window.innerHeight / 2) -  (contentDiv.node().getBoundingClientRect().height  /2)) + 'px';
                                         });


    }

    // getApicLoginDomains()
    // {

    // }

    submitCredentials()
    {
         // apic IP (REQUIRES VALIDATION !!!!!)
         var ipv4 = document.getElementById('apicIpAddress').value;

         if(!this.validateIPaddress(ipv4))
         {
            //alert("Invalid IPv4 address, please correct before submission");
            d3.select("input#apicIpAddress").style("color", "red")
            return;
         }

         // domains  ---> getApicLoginDomains()
         var fDomain = d3.select('select#apicDomains').node().value;

         // save domain
         apicLoginDomain = fDomain;

         // save  IP
         apicIP = ipv4;

         // save web protocol - http/https
         if(document.getElementById('apicWebHttps').checked){
            webProtocol = "https://";}
         else{
            webProtocol = "http://";} 
         
         // save username 
         username = document.getElementById('apicUsername').value;
 
         //save password
         password = document.getElementById('apicPassword').value;

         apicLogin(  (initalLoadComplete ? undefined : getRoot )   );
         
         d3.select("div#apic-login-modal").style("display", "none");  
        
        return;
    }

    validateIPaddress(ipaddress) 
    {  
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) 
        {  
          return (true);  
        }  

        return (false);
    } 

    ipAddressChanged(bForce)
    {
        //console.log("ipAddressChanged");
        // apic IP from form 
        var ipv4 = document.getElementById('apicIpAddress').value;

        if(bForce !== true)
        {
            // has ip changed ?
            if(ipv4 === apicIP)
            { 
                return; 
            }
        }
        
        if(!this.validateIPaddress(ipv4))
        {
            //alert("Invalid IPv4 address, please correct before submission");
            d3.select("input#apicIpAddress").style("color", "red")
            return;
        }

        var url;
        if(document.getElementById('apicWebHttps').checked){
            url = "https://";}
        else{
            url = "http://";} 

        url += ipv4;
        // submit request to get list of APIC login domains
        url += "/api/aaaListDomains.json";

        //console.log("url", url);

        var lfunc = function(_this_)
        {
            if( _this_.readyState === 4)
            {
                if(_this_.status !== 200)
                { 
                    appMsg.postMessage("Failed to get login domains from APIC Controller: " + url , true );
                    return;
                }

                if(_this_.status === 200)
                {
                    // parse response JSON
                    var domainText = (apicLoginDomain === "" ? "DefaultAuth" : apicLoginDomain);
                    console.log(domainText);
                    var respJson = JSON.parse(_this_.responseText) ;
                    var fDomain = d3.select("select#apicDomains");
                    fDomain.selectAll("*").remove();
                    fDomain.selectAll("option")
                        .data(respJson.imdata)
                        .enter()
                            .append("option")
                            .text(function(d){return d.name;})
                            .property("selected", function(d){ return d.name === domainText; });


                    fDomain.attr("disabled", (respJson.imdata.length === 1 ? true : null));

                    
                    fDomain
                }
            }         
        };


        // send 
        this.localSendToAPIC("GET", url, lfunc);

    }

    // url is full url i.e. https://10.10.10.10/api/mo/...
    localSendToAPIC(getOrPost, url, funcListen)
    {
        var localurl = url;    
        if(this.xhr !== undefined){
            this.xhr.abort();}
        this.xhr = new XMLHttpRequest();

        var funcWrapper = function()
        {
            if(this.readyState === 4)
            {
                if(this.status !== 200)
                {                                                
                    appMsg.postMessage("ApicCommsWrapper[Credentials] >> Failure >> Status: " + this.status + " Reason: " + this.statusText, true );
                }
                funcListen(this);
            }   
        };

            
        this.xhr.addEventListener("readystatechange", funcWrapper); 
        this.xhr.open(getOrPost, localurl, true);
        this.xhr.setRequestHeader("content-type", "text/json");
        this.xhr.send();   
    }


 } // class AppMessages

