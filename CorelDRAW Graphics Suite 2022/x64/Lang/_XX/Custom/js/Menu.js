// JScript File

/*  Menu.js *******************************************************

-   "Popup" feature selector menus

Usage:
OnMenuToggleFeature()   -   toggles a feature's state, the elements
                            name attribute must match a xml
                            <Feature/> nodes property
                            
OnShowIt()          - pops the menu open
OnHideIt()          - closes the menu open
OnHideAllMenus()    -   closes all menus on the page (used onfocus of
                        elements before and after menus to close them
                        when tabbing through the page

MenuUpdateSelectors()   -   updates the menu selectors with the correct shade
                            should only be called <body onload="" > so that the
                            page initally shows the correct colors
                        
Example:
    <div id="idCapture" class="Menu"
         onmouseover="OnShowIt('idCaptureMenu')" 
         onmouseout="OnHideIt('idCaptureMenu')"
    >
        <!-- button is used for tabbing, it's size should be set to 1px by 1px -->
        <button onfocus="OnShowItBtn('idCaptureMenu')" id="idCaptureBtn" class="MenuBtn"></button>
        
        Includes: 
        <div id="idCaptureMenu" class="MenuPopUp" style="left: 20px; top: 16px;">
            <input type="checkbox" id="idCaProg" name="CAPFILES" onclick="OnMenuToggleFeature('idCaProg')"/>
            Capture Program Files
            
            <input type="checkbox" id="idCAHelp" name="CAHFILES" onclick="OnMenuToggleFeature('idCAHelp')" />
            Help Files
        </div>
        
    </div> <!-- div class=Menu" -->

NOTE:   - naming convention needs to be followed:
        id="idCapture"      -- for Menu element
        id="idCaptureMenu"  -- for MenuPopUp element
*******************************************************************/


/*  Globals / Defines   *******************************************
*
*   g_strMenuSelectorColor_<n>  = <colours to be used for Menu selectors>
*******************************************************************/
var g_strMenuSelectorColor_AllSelected  = "#ffffff";
var g_strMenuSelectorColor_SomeSelected = "#f0f0f0";
var g_strMenuSelectorColor_NoneSelected = "#c8c8c8";
var g_strCurrentOpenId                  = "";
var g_strCloseItId                      = "";
var g_iMenuCloseTimer                   = 0;

/*  function OnMenuShowIt()   *************************************
*
*   Args:   sId =   the id of the 'menu' element
*
*   Usage:
*   -   Attach to elements onmouseover event
*   -   Example:
*       <div id="idDR" onmouseover="OnShowIt('idDRMenu')">
*           <div id="idDRMenu">
*               ... contents of menu here ...
*           </div>
*       </div>
*           -- idDRMenu element is passed to DisplayIt()
*******************************************************************/
function OnShowIt(sId)
{

    if ("complete" != document.readyState)
    {
        return;
    }
    
    if (g_strCurrentOpenId == sId)
    {
        //cancel the 'timer' and exit
        if (g_iMenuCloseTimer > 0)
        {
            window.clearTimeout(g_iMenuCloseTimer);
            g_iMenuCloseTimer = 0;
            g_strCloseItId = "";
        }
        
        return;
    }
    
    HideAllMenus();
    DisplayIt(sId, true);

} //function OnShowIt()



/*  function OnShowItBtn()   **************************************
*
*   Args:   sId =   the id of the 'menu' element
*
*   Usage:
*   -   Attach to button's onfocus event
*   -   Example:
*       <div id="idDR" onmouseover="ShowIt('idDRMenu')">
*           <button ="idDRBtn" onfocus="OnShowItBtn('idDRMenu')"></button>
*           <div id="idDRMenu">
*               ... contents of menu here ...
*           </div>
*       </div>
*           -- idDRMenu element is passed to DisplayIt()
*           -- NOTE: <button> should be set to 1px by 1px
*           -- this function is provided so that you can 'tab'
*               and/or hotkey to the menu
*******************************************************************/
function OnShowItBtn(sId)
{
    var bSetFocus = true;
    if (sId == g_strCurrentOpenId)
    {
        bSetFocus = false;
        //return;
    }
    
    HideAllMenus();             //hide any that are already displayed
    DisplayIt(sId, true);
    
    if (!bSetFocus)
    {
        return;
    }

    //set focus to the first enabled checkbox in the menu
    var pEl = document.getElementById(sId);
    if (null == pEl)
    {
        return;
    }
    
    var pCollection = pEl.getElementsByTagName("INPUT");
    if (pCollection != null)
    {
        for (Item in pCollection)
        {
            if ("checkbox" == pCollection[Item].type)
            {
                if (false == pCollection[Item].disabled)
                {
                    try
                    {
                        pCollection[Item].focus();
                        break;
                    }
                    catch(e) {}
                }
            }
        } //for (Item in pCollection)
    } //if (pCollection != null)

} //function OnShowItBtn()



/*  function OnHideIt()   *****************************************
*
*   Usage:
*   -   Attach to elements onmouseout event
*   -   Works like ShowIt()... but we pass false to MenuDisplayIt()
*******************************************************************/
function OnHideIt(sId)
{
    //DisplayIt(sId, false);
    
    //set timer to hide it
    g_strCloseItId = sId;
    g_iMenuCloseTimer = window.setTimeout(MenuHideIt, 250);

} //function OnHideIt()

function MenuHideIt()
{
    DisplayIt(g_strCloseItId, false);
    g_iMenuCloseTimer = 0;
    g_strCloseItId = "";
}



/*  function OnHideAllMenus()   ***********************************
*
*   Usage:
*   -   Attach to an elements on onfocus event
*   -   Should be attached to an element in the tab order
*   -   This function provides a way to close the menus when
*       tabbing through the controls
*******************************************************************/
function OnHideAllMenus()
{
    HideAllMenus();

} //function OnHideAllMenus()



/*  function DisplayIt()    ***************************************
*
*   Args:   pMenu   = element to work with
*           bShow   = true/false (meaning show or hide)
*
*   -   pMenu's visibility will be set to visible or hidden based
*       on bShow
*******************************************************************/
function DisplayIt(sMenuId, bShow)
{
    var pMenu = document.getElementById(sMenuId);
    if (null == pMenu)
    {
        return;
    }
    
    var pSelectorId = sMenuId.replace("Menu", "");
    var pSelector = document.getElementById(pSelectorId);
    
    if (true == bShow)
    {
        if (null != pSelector)
        {
            if ("Menu" == pSelector.className)
            {
                pSelector.className = "MenuOn";
            }
        }
        
        pMenu.style.visibility  = "visible";
        pMenu.style.display     = "block";
        g_strCurrentOpenId      = pMenu.id;
    }
    else
    {
        if (null != pSelector)
        {
            if ("MenuOn" == pSelector.className)
            {
                pSelector.className = "Menu";
            }
        }
        
        pMenu.style.visibility  = "hidden";
        pMenu.style.display     = "none";
        g_strCurrentOpenId      = "";
    }
    
} //function DisplayIt()



/*  function HideAllMenus() ***************************************
*
*   -   Searches all <div> elements for class "MenuPopUp" then,
*       passes the element to DisplayIt(el, false)
*******************************************************************/
function HideAllMenus()
{
    var pCollection = document.getElementsByTagName("DIV");
    var pEl = null;
    var Item = 0;
    
    if (pCollection != null)
    {
        for (Item in pCollection)
        {
            if ("MenuPopUp" == pCollection[Item].className)
            {
                DisplayIt(pCollection[Item].id, false);
            }
        }
    }
    
} //function HideAllMenus()


/*  function MenuUpdateSelectors **********************************
*
*   -   Finds all class="MenuPopUp" elements, passes
*       each one to MenuShadeSelectors()
*******************************************************************/
function MenuUpdateSelectors()
{
    //before starting, make sure each checkboxes state is correct
    g_ICAApp.ResolveICAHtmlAttributes();
    
    return;    /*   end the function here, 
                    we won't be updating the colour
                    of the Menu based on the checked
                    state of the checkboxes
                */
    
    var pCollection = document.all.tags("DIV");
    var pEl = null;
    var Item = 0;
    
    if (pCollection != null)
    {
        for (Item in pCollection)
        {
            if ("MenuPopUp" == pCollection[Item].className)
            {
                MenuShadeSelectors(pCollection[Item]);
            }
        }
    }

} //function MenuUpdateSelectors()



/*  function MenuShadeSelectors ***********************************
*
*   Args:   pEl -   html element to evaluate
*
*   -   Loops through all child elements (checkbox) and sets
*       the background color to either:
*           g_strMenuSelectorColor_AllSelected
*           g_strMenuSelectorColor_SomeSelected
*           g_strMenuSelectorColor_NoneSelected
*******************************************************************/
function MenuShadeSelectors(pEl)
{
    if (null == pEl)
    {
        return;
    }
    
    var pCollection = pEl.getElementsByTagName("INPUT");
    var Item = 0;
    var iChecked = 0;   /*  0 means none checked
                            1 means some checked
                            2 means all checked
                        */
    var bAllChecked = true;
    
    if (pCollection != null)
    {
        for (Item in pCollection)
        {
            if ("checkbox" == pCollection[Item].type)
            {
                if (true == pCollection[Item].checked)
                {
                    iChecked = 1;           //at least one is checked
                }
                else if (false == pCollection[Item].checked)
                {
                    bAllChecked = false;    //this one is not checked
                }
            }
            /*if ()
            {
                //check 
            }*/
            
        } //for (Item in pCollection)
    } //if (pCollection != null)
    
    if ( (bAllChecked) && (1 == iChecked) )
    {
        iChecked = 2;   //they are all checked
    }

    //get the menu selector and update the color        
    var sId = pEl.id;
    var pSelectorId = sId.replace("Menu", "");
    pEl = document.getElementById(pSelectorId);
    if (null == pEl)
    {
        return;
    }
    
    if (0 == iChecked)
    {
        pEl.style.backgroundColor = g_strMenuSelectorColor_NoneSelected;
    }
    else if (1 == iChecked)
    {
        pEl.style.backgroundColor = g_strMenuSelectorColor_SomeSelected;
    }
    else
    {
        pEl.style.backgroundColor = g_strMenuSelectorColor_AllSelected;
    }

} //function MenuShadeSelectors()



/*  function OnMenuToggleFeature() ********************************
*
*   Args:   sChkId  -   id of element who's feature you want
*                       to toggle
*   -   Toggles the <Feature />
*   -   Refreshes the Menus
*
*   Example:
*   <input id="idChkDR"
*          type="checkbox" 
*          name="DRAW" 
*          onclick="MenuToggleFeature('idChkDR')"
*          />
*******************************************************************/
function OnMenuToggleFeature(sChkId)
{
    if (null == g_ICAApp)
    {
        return;
    }
    
    g_ICAApp.ToggleFeature(sChkId);
   	SetInstallNowButtonState();

    
    //check what shade the menu selector should be
    //resolve any other checkboxes
    window.setTimeout(MenuUpdateSelectors, 5);

} //function OnMenuToggleFeature



function SetInstallNowButtonState()
{
    //disable 'Install Now' button if none of the main applications 
    //are selected for install set it's tooltip
    var pBtnInstallNow = document.getElementById("id_Str_Btn_Install");
    if (null != pBtnInstallNow)
    {

        if ( ("1" != g_ICAApp.GetProperty("DRAW")) &&
             ("1" != g_ICAApp.GetProperty("PP")) &&
             ("1" != g_ICAApp.GetProperty("CAPTURE")) &&
             ("1" != g_ICAApp.GetProperty("FONTMANAGER")) )
        {
            pBtnInstallNow.disabled = true;
            return;
        }
        
        if (!IsLanguagePackSelected())
        {
            pBtnInstallNow.disabled = true;
            return;
        }
        
        pBtnInstallNow.disabled = false;
        
    }

} //function SetInstallNowButtonState()




function IsLanguagePackSelected()
{
    if (("1" != g_ICAApp.GetProperty("RU")) &&
        ("1" != g_ICAApp.GetProperty("PL")) &&
         ("1" != g_ICAApp.GetProperty("DE")) &&
         ("1" != g_ICAApp.GetProperty("FR")) &&
         ("1" != g_ICAApp.GetProperty("ES")) &&
         ("1" != g_ICAApp.GetProperty("BR")) &&
         ("1" != g_ICAApp.GetProperty("IT")) &&
         ("1" != g_ICAApp.GetProperty("JP")) &&
         ("1" != g_ICAApp.GetProperty("CZ")) &&
         ("1" != g_ICAApp.GetProperty("CS")) &&
         ("1" != g_ICAApp.GetProperty("CT")) &&
         ("1" != g_ICAApp.GetProperty("NL")) &&
         ("1" != g_ICAApp.GetProperty("EN")) &&
         ("1" != g_ICAApp.GetProperty("TR")) &&
         ("1" != g_ICAApp.GetProperty("SV")) )
    {
        return false;
    }
    
    return true;
    
} //IsLanguagePackSelected()


/*  function OnResetDefaults() ************************************
*
*   -   Resets the installation to default settings
*   -   Called onclick of a button
*******************************************************************/
function OnResetDefaults()
{
    g_ICAApp.ExecuteFN("JS_ResetDefaults");
    MenuUpdateSelectors();
    g_ICAApp.CalculateDiskSpace(true);
    SetInstallNowButtonState();
    
} //function OnResetDefaults


/*  get the ICA application ****************************************/
var g_ICAApp = window.external;



