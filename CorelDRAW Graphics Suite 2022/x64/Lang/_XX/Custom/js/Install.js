// JScript File
// Setup.js
//  -- stores common files scripts

var g_Setup         = window.external;
var g_brandingDark = "#61A706";
var g_brandingLight = "#D0E8D9";
var g_programs = "false";
var g_features = "false";
var g_location = "false";
function setPage(sPage)
{
    if (sPage == "programs")
    {
      g_programs = "true";
      g_features = "false";
      g_location = "false";  
      g_Setup.SetProperty("tracker", "appSelection");

    }
    if (sPage == "features")
    {
      g_programs = "false";
      g_features = "true";
      g_location = "false";  
      g_Setup.SetProperty("tracker", "appSelection");  
    }
    if (sPage == "location")
    {
      g_programs = "false";
      g_features = "false";
      g_location = "true";
      g_Setup.SetProperty("tracker", "installLocation");
    }
            
}
function LoadPageCounter_1(sPage)
{
    if (g_bInstalled)
    {
        if ((g_bMultiLang) || ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage)))
        {
            idPage1_4.style.left = "41.98em";
            idPage2_4.style.left = "42.6em";
            idPage3_4.style.left = "43.23em";
        }
        else
        {
            idPage1_4.style.left = "42.6em";
            idPage2_4.style.left = "43.23em";
        }
    }
    if (sPage == "programs")
    {
        idPage1_4.style.color = g_brandingDark;
        idPage2_4.style.color = "black";
        if (!g_bInstalled) //show it all
        {
            idPage3_4.style.color = "black";
            idPage3_4.style.display = "block";
            idPage4_4.style.display = "none";
        }
        else
        {
            if ((g_bMultiLang) || ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage)))
            {
                idPage3_4.style.color = "black";
                idPage3_4.style.display = "block";
                idPage4_4.style.display = "none";
            }
            else
            {
                idPage3_4.style.display = "none";
                idPage4_4.style.display = "none";            
            }
        }
    }
    if (sPage == "features")
    {
        idPage1_4.style.color = "black";
        idPage2_4.style.color = g_brandingDark;

        if (!g_bInstalled) //show it all
        {
            idPage3_4.style.color = "black";
            idPage3_4.style.display = "block";
            idPage4_4.style.display = "none";
        }
        else
        {
            if ((g_bMultiLang) || ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage)))
            {
                idPage3_4.style.color = "black";
                idPage3_4.style.display = "block";
                idPage4_4.style.display = "none";
            }
            else
            {
                idPage3_4.style.display = "none";
                idPage4_4.style.display = "none";
            }
        }
    }

    if (sPage == "location")
    {
        idPage1_4.style.color = "black";
        idPage2_4.style.color = "black";

        if (!g_bInstalled) //show it all
        {
            idPage3_4.style.color = g_brandingDark;
            idPage3_4.style.display = "block";
           
            idPage4_4.style.display = "none";
        }
        else
        {
            if ((g_bMultiLang) || ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage)))
            {
                idPage3_4.style.color = g_brandingDark;
                idPage3_4.style.display = "block";
                idPage4_4.style.display = "none";
            }
            else
            {
                idPage3_4.style.display = "none";
                idPage4_4.style.display = "none";
            }
        }
    }
}
function LoadFeatures()
{
    var pInstall = document.body.ownerDocument.getElementById("idInstallDiv");
    var pFeatures = document.body.ownerDocument.getElementById("idFeaturesDiv");
    var pLocation = document.body.ownerDocument.getElementById("idLocationDiv");
    if (null != pInstall)
        pInstall.style.display = "none";    
        
    if (null != pFeatures)
        pFeatures.style.display = "block";
        
    if (null != pLocation)
        pLocation.style.display = "none";

    setPage("features");
    LoadButtons("features");
    LoadPageCounter_1("features");
    ConfigFeaturesUI();

    if ("1" == g_Setup.GetProperty("Disable.GPL"))
    {
        //idChkGPL.checked = true;
        g_Setup.SetProperty("GPL", "1");
        idChkGPL.disabled = true;
        id_Str_Install_GPL.innerHTML = g_Setup.GetProperty("Str_Install_GPL_Installed");
        idChkGPLLabel.style.color = "gray";
        idChkGPLDiv.style.color = "gray";
    }
    
    //Verify VSTA can be installed
    if ("1" == g_Setup.GetProperty("Disable.VSTA"))
    {
        //idVSTA.checked = true;
        g_Setup.SetProperty("VSTA", "1");
        idVSTA.disabled = true;
        idVSTA.style.color = "gray";
        id_Str_Install_VSTA.disabled = true;
        id_Str_Install_VSTA.style.color = "gray";

    }
    if (!g_bInstalled)
    {
        DisplayOptionsNotInstalledUI();
    }
    else
    {
        DisplayOptionsInstalledUI();
    }    
    MenuUpdateSelectors();
    SetInstallNowButtonState();
    g_RequiredText = g_Setup.GetProperty("Str.Text.RequiredFeature");
    
}

function LoadPrograms()
{
    var pInstall = document.body.ownerDocument.getElementById("idInstallDiv");
    var pFeatures = document.body.ownerDocument.getElementById("idFeaturesDiv");
    var pLocation = document.body.ownerDocument.getElementById("idLocationDiv");    
    if (null != pInstall)
        pInstall.style.display = "block";    
        
    if (null != pFeatures)
        pFeatures.style.display = "none";
        
    if (null != pLocation)
        pLocation.style.display = "none";
    setPage("programs");
    LoadButtons("programs");
    LoadPageCounter_1("programs");
}


function LoadLocation()
{
    var pInstall = document.body.ownerDocument.getElementById("idInstallDiv");
    var pFeatures = document.body.ownerDocument.getElementById("idFeaturesDiv");
    var pLocation = document.body.ownerDocument.getElementById("idLocationDiv");        
    if (null != pInstall)
        pInstall.style.display = "none";    
        
    if (null != pFeatures)
        pFeatures.style.display = "none";
        
    if (null != pLocation)
        pLocation.style.display = "block";        

	setPage("location");
    LoadButtons("location");
    LoadPageCounter_1("location");

    if (!g_bInstalled)
    {
        DisplayLocationNotInstalledUI();
    }
    else
    {
        DisplayLocationInstalledUI();
    }
    
}

function LoadButtons(sPage)
{
    var pIdInstall = document.body.ownerDocument.getElementById("id_Str_Btn_Install");
    var pIdNextPrograms = document.body.ownerDocument.getElementById("id_Str_Btn_Next_1");
    var pIdNextFeatures = document.body.ownerDocument.getElementById("id_Str_Btn_Next_2");

    var pIdBackFeatures = document.body.ownerDocument.getElementById("id_Str_Btn_Back_2");
    var pIdBackLocation = document.body.ownerDocument.getElementById("id_Str_Btn_Back_4");
    var pIdBack = document.body.ownerDocument.getElementById("id_Str_Btn_Back_1");

var pIdHelpPrograms = document.body.ownerDocument.getElementById("idHelp_Programs");
var pIdHelpFeatures = document.body.ownerDocument.getElementById("idHelp_Features");
var pIdHelpLocation = document.body.ownerDocument.getElementById("idHelp_Location");
    
    if (sPage == "programs")
    {
    
        if (null != pIdNextPrograms)
            pIdNextPrograms.style.display = "block";

        if (null != pIdNextFeatures)
            pIdNextFeatures.style.display = "none";
        if (null != pIdBackFeatures)
            pIdBackFeatures.style.display = "none";

        if (null != pIdInstall)
            pIdInstall.style.display = "none";

        if (null != pIdHelpPrograms)
            pIdHelpPrograms.style.display = "block";
        if (null != pIdHelpFeatures)
            pIdHelpFeatures.style.display = "none";
        if (null != pIdHelpLocation)
            pIdHelpLocation.style.display = "none";

        if (g_bInstalled)
        {
	        if (null != pIdBack)
	            pIdBack.style.display = "block";
        }
            
    }
    else if (sPage == "features")
    {
        if (null != pIdNextPrograms)
            pIdNextPrograms.style.display = "none";
        if (null != pIdBackLocation)
            pIdBackLocation.style.display = "none";
        if (null != pIdBack)
    	    pIdBack.style.display = "none";
        if (null != pIdBackFeatures)
            pIdBackFeatures.style.display = "block";

        if (null != pIdHelpPrograms)
            pIdHelpPrograms.style.display = "none";
        if (null != pIdHelpFeatures)
            pIdHelpFeatures.style.display = "block";
        if (null != pIdHelpLocation)
            pIdHelpLocation.style.display = "none";

        if (g_bInstalled)
        {
            if (!g_bMultiLang)
            {
                if ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage))
                {
                    if (null != pIdInstall)
                    pIdInstall.style.display = "none";
                    if (null != pIdNextFeatures)
                    pIdNextFeatures.style.display = "block";

                }
                else
                {
                    if (null != pIdInstall)
                        pIdInstall.style.display = "block";
                    if (null != pIdNextFeatures)
                        pIdNextFeatures.style.display = "none";
                }                    
            }
            else
            {
                if (null != pIdInstall)
                    pIdInstall.style.display = "none";
                if (null != pIdNextFeatures)
                    pIdNextFeatures.style.display = "block";
            }
        }
        else
        {
            if (null != pIdNextFeatures)
                pIdNextFeatures.style.display = "block";
            if (null != pIdInstall)
                pIdInstall.style.display = "none";
                
        }
        	
    }

    else if (sPage == "location")
    { 
        if (null != pIdNextFeatures)
            pIdNextFeatures.style.display = "none";
        if (null != pIdBackFeatures)
            pIdBackFeatures.style.display = "none";
        if (null != pIdNextPrograms)
            pIdNextPrograms.style.display = "none";
        if (null != pIdBack)
    	    pIdBack.style.display = "none";
        if (null != pIdInstall)
            pIdInstall.style.display = "block";

        if (null != pIdHelpPrograms)
            pIdHelpPrograms.style.display = "none";
        if (null != pIdHelpFeatures)
            pIdHelpFeatures.style.display = "none";
        if (null != pIdHelpLocation)
            pIdHelpLocation.style.display = "block";
            
        if (g_bInstalled)
        {
            if (null != pIdBackLocation)
                pIdBackLocation.style.display = "block";

        }
        else
        {            
            if (null != pIdBackLocation)
                pIdBackLocation.style.display = "block";

        }
    }

}

function ConfigFeaturesUI()
{
    var ui_action = g_Setup.GetProperty("HIDE_SHELLEXT_UI");
    var shellLabel = document.body.ownerDocument.getElementById("id_Str_Install_Shell");
    var shell = document.body.ownerDocument.getElementById("idShellExt");

    var VBAMenu = document.body.ownerDocument.getElementById("idUtilitiesMenu");
    var VBABlock = document.body.ownerDocument.getElementById("idUtilitiesVBABlock");

    if ("disable" == ui_action)
    {
        g_Setup.SetProperty("SHELLEXT", "1");
        shellLabel.style.color = "gray";
        shell.checked = true;
        shell.disabled = true;
      
    }
    else if ("hide" == ui_action)
    {
        g_Setup.SetProperty("SHELLEXT", "0");
        shellLabel.style.display = "none";
        shell.style.display = "none";
    }            
 
} //function ConfigFeaturesUI()    

function DisplayOptionsInstalledUI()
{
    idCopyCabsBlock.style.display = "none";
    
} //DisplayInstalledUI()

function DisplayLocationInstalledUI()
{
    id_Str_Btn_Install.style.visibility = "visible";
    id_Str_Btn_Install.style.display = "block";
    SetInstallNowButtonState(); 
    var menu_height = 8;
    if ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage))
    {
        idEnterpriseDiv.style.display = "Block";
        idEnterpriseBlock.style.top = "4.06em";
       
        idEnterpriseHR.style.display = "none";
        idSelectLangBlock.style.top = "16em";
        menu_height = 6;
    }
    if (true == SetMenuHeight_Languages(menu_height))
    {
        //more than 1 language is included, show the list
        if ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage))
        {
            idSelectLangBlock.style.top = "8em";
            idLocationHR.style.display = "Block";
            idLocationHR.style.top = "10.5em";
        }
        else
        {
            idSelectLangBlock.style.top = "0em";
            idLocationHR.style.display = "none";
        }
        idSelectLangBlock.style.visibility = "visible";
        
    }
    else
    {
        idLocationHR.style.display = "none";
    }
    
} //DisplayInstalledUI()

function DisplayOptionsNotInstalledUI()
{
  
    try
    {
        var str = window.external.GetProperty("DESKTOPSHORTCUTS");
        if ("disable" == str.toLocaleLowerCase())
        {
            idShortcutBlock.style.display = "none";
        }
        
        str = window.external.GetProperty("CACHE_SETUP_SOURCE_SHOWUI");
        if ("hide" == str.toLocaleLowerCase())
        {
            idCopyCabsBlock.style.display = "none";
        }
        
    }
    catch(err) {}
    
} //function DisplayNotInstalledUI()

function DisplayLocationNotInstalledUI()
{
    idInstallFolderDiv.style.display = "block";
    var menu_height = 8;
    if ("1" ==  window.external.GetProperty("SHOW_CDAE")&&(!g_bIsAdminPackage))
    {
        idEnterpriseDiv.style.display = "Block";
        idLocationHR.style.top = "19em";
        idSelectLangBlock.style.top = "16em";
        menu_height = 6;
    }	
    else
    {
        idLocationHR.style.top = "17.45em";
        idSelectLangBlock.style.top = "15em";
    }
   //Program Languages...
    if (true == SetMenuHeight_Languages(menu_height))
    {
        idSelectLangBlock.style.visibility = "visible";

    }
   
    if ("visible" != idSelectLangBlock.style.visibility)
    {

       
    }
    
    SetInstallNowButtonState();
   
    
} //function DisplayNotInstalledUI()
/**
*   \remarks    -   Sets the height of the 'language selector' menu
*               -   Returns true if more than one language is avaliable
*/
function SetMenuHeight_Languages(items)
{
    var items_displayed_max = items;   //max items that can be displayed in menu
    var iChkHeight = 1.25;            //20 is the height required for 1
    var iSize = 0.13;                  //2 is padding above item(s) in list
            
    var pEl = null;
    var sId, sProp;
    var x = 0;
    var items_displayed = 0;
            
    for (var x = 1 ; x < 20 ; x++)  //max 20 languages (id1 to id20)
    {
        sId = "id" + x;
        
        pEl = document.getElementById(sId);
        if (null != pEl)
        {
            //title has the property to check that will
            //determine if this sku contains the language
            sProp = "Include." + pEl.title;
            
            if ("1" == g_Setup.GetProperty(sProp))
            {
                pEl.style.display = "block";
                if (items_displayed < items_displayed_max)
                {
                    iSize = iSize + iChkHeight;
                   // if (isOdd(items_displayed))
                    //{
                      //  pEl.style.background = "#D0E8D9";
                    //}
                    items_displayed++;
                }

            }
            else
            {
                pEl.style.display = "none"; //not included
            }
        }
        
    }

    iSize = iSize + 0.13;                  //2 is padding below item(s) in list
    var sHeight = iSize + "em";
    
    pEl = document.getElementById("idLangMenu");
    if (null != pEl)
    {
        pEl.style.height = sHeight;
    }
    
    if (items_displayed > 1)
        return true;
        
    return false;
    
} //function SetMenuHeight_Languages()

function SetDropDown_Color(sID)
{
    var items_displayed_max = 25;   //max items that can be displayed in menu
    var pEl = null;
    var sNum;
    var x = 0;
    var items_displayed = 0;
    for (var x = 1 ; x < items_displayed_max ; x++)  //max 20 languages (id1 to id20)
    {
        sNum = sID + x;
        
        pEl = document.getElementById(sNum);
        if (null != pEl)
        {
            if (isOdd(items_displayed))
            {
                pEl.style.background = g_brandingLight;
            }
            items_displayed++;
        }
        
    }    
}
function isOdd(num)
{
 return num % 2;
 }

/**
*   \remarks
*/


//function OnResetDefaultsBtn()
//{
  //  idResetBtn.disabled = true;
    
    //OnResetDefaults()
           
    //idResetBtn.disabled = false;
    
//} //function OnResetDefaultsBtn()



function OnPathChange()
{
    g_Setup.CalculateDiskSpace(true);
    g_Setup.ResolveICAHtmlAttributes();

} //function OnPathChange()

function SetMultiLanguages()
{
    var pEl = null;
    var sId, sProp;
    var x = 0;
    var items_displayed = 0;
            
    for (var x = 1 ; x < 20 ; x++)  //max 20 languages (id1 to id20)
    {
        sId = "id" + x;
        
        pEl = document.getElementById(sId);
        if (null != pEl)
        {
            //title has the property to check that will
            //determine if this sku contains the language
            sProp = "Include." + pEl.title;
            
            if ("1" == g_Setup.GetProperty(sProp))
            {
                items_displayed++;
            }
        }
    }
    
    if (items_displayed > 1)
        return true;
        
    return false;
    
} //function SetMenuHeight_Languages()

function BackToARP()
{
    window.location = "../../_XX/Custom/ARP.htm";

}

function menuitem_hover(el)
{
	el.style.background = g_brandingLight;
}
function menuitem_out(el)
{
	el.style.background = "white";
}

function KeyCheck(event)
{
   var KeyID = event.keyCode;
var ret = true;
var x = document.activeElement.id;
   switch(KeyID)
   {
      case 8:
	if (x == "idINSTALLDIR")
	{
	     ret = true;
	}
	else
	{
	      OnClickBackspace();
	      ret = false;
	}
      break; 
      default:
      break;
   }
  event.returnValue = ret;
}

function OnClickBackspace()
{
    if (g_programs == "true")
    {
      //window.location = "InstallChoose.htm";
    }
    else if (g_features == "true")
    {
      LoadPrograms();
    }
    else if (g_location == "true")
    {
        LoadFeatures();
    }
    else
    {
      //window.location = "InstallChoose.htm";
    }

}