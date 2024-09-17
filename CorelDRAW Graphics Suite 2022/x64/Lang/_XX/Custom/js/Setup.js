// JScript File
// Setup.js
//  -- stores common files scripts
    
var g_Setup         = window.external;

var g_bInstalled    = true;
var g_bIsAdmin      = false;
var g_UseSNT      = false;
var g_bIsAdminPackage = false;
var g_bCoExists     = false;
var g_bShowLaunchers = false;
var g_sLang         = "EN";
var g_RemoveAll     = false;
var g_bIsConnected    = true;
var g_bShowTrialSurvey = false;
var g_bShowSurvey = false;
var g_bHideInternetFeatures = false;
var g_LaunchedFromStub = false;
var g_brandingDark = "#61A706";
var g_brandingLight = "#D0E8D9";
var g_DisableAdminInstall = false;

try
{
    if ("" == g_Setup.GetProperty("Installed"))
        g_bInstalled = false;
      
    if ("ADMIN" == g_Setup.GetProperty("ACTION"))
        g_bIsAdmin = true;

    if ("ALL" == g_Setup.GetProperty("REMOVE"))
        g_RemoveAll = true;
        
    if ("1" == g_Setup.GetProperty("IsAdminPackage"))
        g_bIsAdminPackage = true;

    if ("1" == g_Setup.GetProperty("CGS_R_INSTALLED"))
        g_bCoExists = true;

    if ("1" == g_Setup.GetProperty("SNT"))
        g_UseSNT = true;
       
    if ("1" == g_Setup.GetProperty("SHOW_LAUNCHERS"))
        g_bShowLaunchers = true;

    if ("0" == g_Setup.GetProperty("ISCONNECTED"))
        g_bIsConnected = false;

    if ("1" == g_Setup.GetProperty("SHOW_TRIAL_SURVEY"))
        g_bShowTrialSurvey = true;

    if ("1" == g_Setup.GetProperty("SHOW_SURVEY"))
        g_bShowSurvey = true;

    if ("1" == g_Setup.GetProperty("HIDE_INTERNETFEATURES"))
        g_bHideInternetFeatures = true;

    if ("1" == g_Setup.GetProperty("LAUNCHED_FROM_STUB"))
        g_LaunchedFromStub = true;

    if ("true" == g_Setup.GetProperty("ICA.Disable.AdminInstall")||"1" == g_Setup.GetProperty("ICA.Disable.AdminInstall"))
        g_DisableAdminInstall = true;
    
    g_sLang = g_Setup.GetProperty("SETUP_LANG");        
}
catch(err) {}




/**
*   \remarks    Opens TARGETDIR and ends the setup
*/
function OnAdminOpenFolder()
{
    g_Setup.ExecuteFN("JS_OpenTargetDir");
    g_Setup.EndModalLoop(0);
    
} //OnAdminOpenFolder()

/**
*   \remarks    Tells Setup to launch an application
*/
function LaunchIt(str)
{
    if ("dr" == str)
    {
        g_Setup.SetProperty("apptolaunch", "CorelDrw.exe");
    }
    else if ("pp" == str)
    {
        g_Setup.SetProperty("apptolaunch", "CorelPP.exe");
    }

    g_Setup.ExecuteFN("JS_LaunchApplication");
    g_Setup.EndModalLoop(0);
    
} //LaunchIt()
function WriteIt(sLine)
{
    var pEl = document.body.ownerDocument.getElementById("idDebugMsg");
    if (null != pEl)
    {
        pEl.innerText = pEl.innerText + sLine + " - ";
    }
}


function MenuShow(sId)
{
    var pEl = document.body.ownerDocument.getElementById(sId);
    if (null != pEl)
    {
        pEl.style.visibility = "visible";
        pEl.style.display = "block";
    }
}

function MenuHide(sId)
{
    var pEl = document.body.ownerDocument.getElementById(sId);
    if (null != pEl)
    {
        pEl.style.visibility = "hidden";
        pEl.style.display = "none";
    }
}




/*  function HighLightButton() ************************************
*
*   -   Hightlight buttons
*   -   Called onMouseover of a button
*******************************************************************/

function HighLightButton(sId)
{
        var pEl = document.body.ownerDocument.getElementById(sId);
        if (null == pEl)
        {
            return;
        }
    	pEl.style.background = g_brandingLight;
    	pEl.style.color = "black";
}
/*  function UnHighLightButton() ************************************
*
*   -   UnHightlight buttons
*   -   Called onMouseout of a button
*******************************************************************/
function UnHighLightButton(sId)
{
        var pEl = document.body.ownerDocument.getElementById(sId);
        if (null == pEl)
        {
            return;
        }
        pEl.style.background = g_brandingDark;
        pEl.style.color = "white";
}

function HighLightDesc(sID) {
    var pEl = document.body.ownerDocument.getElementById(sID);
    if (null == pEl) {
        return;
    }
    pEl.style.color = g_brandingDark;

} //function HighLightDesc(pEl)

function UnHighLightDesc(sID) {
    var pEl = document.body.ownerDocument.getElementById(sID);
    if (null == pEl) {
        return;
    }

    pEl.style.color = "#333333";
} //function UnHighLightDesc(pEl)

function HighLightClose()
{
    idClose.className = "CloseBtnOver";
    idClose.src = "../../_XX/Custom/Images/close_hover.png"
} //function HighLightClose()

function UnHighLightClose()
{
    idClose.className = "CloseBtn";
    idClose.src = "../../_XX/Custom/Images/close.png"        
} //function UnHighLightClose()


function ShowHelp(sPath, sID)
{
    var link, path;
    if(g_bIsConnected)
    {
        if (sID == "")
        {
            sID = "IDDH_DEFAULT";
        }
        g_Setup.SetProperty("doc_topic", sID);
        g_Setup.ExecuteFN("JS_LaunchWebHelp");
         
    }
    else
    {
        link = WWHBookData_MatchTopic(sID);
          g_Setup.SetProperty("doc_link", link);      
        if (sPath.indexOf('_XX') >= 0)
        {    
            path  = "../../"+g_sLang+"/help/"+link;
        }
        else
        {    
            path = "../help/"+link;    
        }
        //window.open(path, '_blank', '');
        g_Setup.ExecuteFN("JS_LaunchLocalHelp");
    }
}  


function LoadBtns()
{
    var pDivs = document.body.ownerDocument.getElementsByTagName('div');
    var pLabels = document.body.ownerDocument.getElementsByTagName('label');
    var pButtons = document.body.ownerDocument.getElementsByTagName('button');
    var i = pButtons.length;
    var j = pLabels.length;
    var k = pDivs.length;
    var str, n, retstr, access;
    while( i-- )
    {
        if( pButtons[i].id && pButtons[i].id.indexOf( 'id_Str_Btn_' )===0 )
        {
        
            str = pButtons[i].id;
            n = str.split("_");
            if (!isNaN(n[n.length-1]))
                retstr = n[1]+"_"+n[2]+"_"+n[3];
            else
                retstr = str.slice(3) ;
			access = retstr + "_AccessKey";
            document.getElementById(pButtons[i].id).innerHTML = g_Setup.GetProperty(retstr);
			document.getElementById(pButtons[i].id).accessKey = g_Setup.GetProperty(access);
        }
    }
    while( j-- )
    {
        if( pLabels[j].id && pLabels[j].id.indexOf( 'id_Str_Btn_' )===0 )
        {
            str = pLabels[j].id;
            n = str.split("_");
            if (!isNaN(n[n.length-1]))
                retstr = n[1]+"_"+n[2]+"_"+n[3];
            else
                retstr = str.slice(3) ;       
            document.getElementById(pLabels[j].id).innerHTML = g_Setup.GetProperty(retstr);
        }
    }
    while( k-- )
    {
        if( pDivs[k].id && pDivs[k].id.indexOf( 'id_Str_Btn_' )===0 )
        {
            str = pDivs[k].id;
            n = str.split("_");
            if (!isNaN(n[n.length-1]))
                retstr = n[1]+"_"+n[2]+"_"+n[3];
            else
                retstr = str.slice(3) ;          
            document.getElementById(pDivs[k].id).innerHTML = g_Setup.GetProperty(retstr);
            
        }
    }
  
}

function LoadStrings()
{
    var pDivs = document.body.ownerDocument.getElementsByTagName('div');
    var pLabels = document.body.ownerDocument.getElementsByTagName('label');
    var pSpans = document.body.ownerDocument.getElementsByTagName('span');
    var pAs = document.body.ownerDocument.getElementsByTagName('a');
    var pFonts = document.body.ownerDocument.getElementsByTagName('font');
    var pSelectOption = document.body.ownerDocument.getElementsByTagName('option');
    var i = pDivs.length;
    var j = pLabels.length;
    var k = pSpans.length;
    var l = pAs.length;
    var m = pFonts.length;
    var h = pSelectOption.length;
    var str, n, retstr;
    while( i-- )
    {
        if( pDivs[i].id && pDivs[i].id.indexOf( 'id_Str_' )===0 )
        {
            str = pDivs[i].id;
            retstr = str.slice(3);         
            document.getElementById(pDivs[i].id).innerHTML = g_Setup.GetProperty(retstr);
        }
    }
    while( j-- )
    {
        if( pLabels[j].id && pLabels[j].id.indexOf( 'id_Str_' )===0 )
        {
            str = pLabels[j].id;
            retstr = str.slice(3);           
            document.getElementById(pLabels[j].id).innerHTML = g_Setup.GetProperty(retstr);
        }
    }
    while( k-- )
    {
        if( pSpans[k].id && pSpans[k].id.indexOf( 'id_Str_' )===0 )
        {
            str = pSpans[k].id;
            retstr = str.slice(3);           
            document.getElementById(pSpans[k].id).innerHTML = g_Setup.GetProperty(retstr);
        }
    }    
    while( l-- )
    {
        if( pAs[l].id && pAs[l].id.indexOf( 'id_Str_' )===0 )
        {
            str = pAs[l].id;
            retstr = str.slice(3);           
            document.getElementById(pAs[l].id).innerHTML = g_Setup.GetProperty(retstr);
        }
    }
    while( m-- )
    {
        if( pFonts[m].id && pFonts[m].id.indexOf( 'id_Str_' )===0 )
        {
            str = pFonts[m].id;
            retstr = str.slice(3);           
            document.getElementById(pFonts[m].id).innerHTML = g_Setup.GetProperty(retstr);
        }
    }    
    while( h-- )
    {
        if( pSelectOption[h].id && pSelectOption[h].id.indexOf( 'id_Str_' )===0 )
        {
            str = pSelectOption[h].id;
            retstr = str.slice(3);           
            document.getElementById(pSelectOption[h].id).innerHTML = g_Setup.GetProperty(retstr);
        }
    }    

}

function LoadAdminError(errorcode, id)
{
    var str, retstr;
    var el = document.getElementById(id);
    str = "Str_Admin_Error_"+errorcode;
    if (g_Setup.GetProperty(str) == 0)
    {   //use unknown
        str = g_Setup.GetProperty("Str_Admin_Error_0");
        el.innerHTML = errorcode+": "+str;
    }
    else
    {
        el.innerHTML = g_Setup.GetProperty(str);
    }

}

function LoadLinks(el)
{
    var str, link, prestr, poststr, idstr, newstr, regex, path, url;
    idstr = el.id;
    var strID = idstr.slice(3);
	str = g_Setup.GetProperty(strID);
	regex = /\[(.*)\]/;
	link=str.match(regex);
	prestr=str.substr(0, str.indexOf('[')); 
	poststr=str.split(']')[1];

	if (idstr == "id_Str_License_Read_EULA")
	{
		url = '<a href=\"#"\ onclick=\"return LaunchURL_EULA();\">'+link[1]+'</a>';
		newstr = prestr + url + poststr;
		el.innerHTML = newstr;	
	}
	else if (idstr == "id_Str_License_Read_TOS")
	{
		url = '<a href=\"#"\ onclick=\"return LaunchURL_TOS();\">'+link[1]+'</a>';
		newstr = prestr + url + poststr;
		el.innerHTML = newstr;
	}
	
}

function isHighDpi() {

    var dpi = g_Setup.GetProperty("ICA.CurrentDPI");
	return dpi >= 144;
}

function LoadImage(el)
{
	var name = el.name;
	var src = el.src;

	if (isHighDpi())
  	{
     
      src = src + "_hdpi";
    }

	el.src = src + ".png";  



}

function getDPI()
{

	var dpi = document.body.ownerDocument.getElementById("dpi").offsetHeight;
g_Setup.SetProperty("dpi", dpi);


	return dpi;
}
function createDPIdiv()
{

  var newDiv = document.createElement("div"); 
  newDiv.setAttribute("id", "dpi");

 var currentDiv = document.body.ownerDocument.getElementById("idBackGrd");
   document.body.insertBefore(newDiv, currentDiv);  
 
}
function initPage(page)
{
    LoadImage(BrandingLeft);
    LoadStrings();
    LoadBtns();	

    if ((page.toLowerCase() !== "finsuc")&&(page.toLowerCase() !== "finerr"))
    {
        tracker(page);
    }
}
function tracker(page)
{

    g_Setup.SetProperty("tracker", page);

}
