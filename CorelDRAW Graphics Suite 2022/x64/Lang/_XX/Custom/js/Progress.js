// JScript File

/*  Progress.js *******************************************************
*
*   -   Progress bar script
*
*   -   Typically the progress bar is made of 2 containers
*           idProgressOuter - An outer one for the boundery
*           idProgressInner - An inner one for the fill area
*   -   The style of each container would descrbe the look of the progress bar
*
*   -- Add to html page: (left, top, and width can be anything)
*   <div id="idProgressOuter" class="ProgressOuter" style="left: 15px; top: 75px; width: 645px;">
*       <div id="idProgressInner" class="ProgressInner"></div>
*   </div>
*
*	-- class ProgressInner needs to have light added to it, if more than one
*		filter is used, light MUST be first
*	.ProgressOuter .ProgressInner
*	{
*		filter: progid:DXImageTransform.Microsoft.Light()
*				progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#da0000,endColorStr=darkred);
*	}
*
*	-- Implementation:
*			- call OnPBLightIt() to start the lighting effect
*			- call OnPBStartIndeterminate() to enable inderterminate progress
*			- when finished with the progress bar use OnPBEndIt()
*
*	-	Use g_iLightAmbient<> and g_iLightPoint<> variables to change
*		the color and strenght of the lights
***********************************************************************/

/*  Globals / Defines   ***********************************************
*
***********************************************************************/

var g_sPBIdProgressOuter		= "idProgressOuter";
var g_sPBIdProgressInner		= "idProgressInner";

var g_iPBIncrement				= 2;		//steps used to increment indeterminate progress bar
var g_iPBInderterminateDelay    = 100;      //delay between steps indeterminate increments
var g_iLightIncrement			= 10;		//distance the light travels with each increment
var g_iLightDelay				= 2000;		//delay (in milliseconds) from when the 
											//light hits the end of the progress bar, 
											//until we start it again

//Ambient light source, 255, 255, 255, 100 will light the entire background
var g_iLightAmbientRed			= 255;
var g_iLightAmbientGreen		= 255;
var g_iLightAmbientBlue			= 255;
var g_iLightAmbientStrength		= 100;

//Point light source is the animated light that we move a long the progress bar
var g_iLightPointZ				= 45;
var g_iLightPointRed			= 50;
var g_iLightPointGreen			= 100;
var g_iLightPointBlue			= 50;

var g_iLightPointStrength		= 20;

var g_PBInner					= null;		//idProgressInner element
var g_iLightLeft				= 0;
var g_iPBWidth					= 0;
var g_iLightTimeoutID			= 0;
var g_iPBTimeoutID				= 0;


/*	PBAnimatePointLight	***********************************************
*
*	-	Moves the Point light along the progress bar
***********************************************************************/
function PBAnimatePointLight()
{
	var iDelay = 150;
    var sWidth = g_PBInner.style.width;
    var iWidth = sWidth.replace("px", "");
    if (iWidth > 150)
    {
		//only animate if progress bar is wider than 150
		//if less, it doesn't look very good
		iWidth--;
		iWidth = iWidth + g_iLightIncrement;
    
		if (0 == g_iLightLeft)
		{
			//enable / re-enable the light source
			// Light filter does not work on Win8. Remove it
			// g_PBInner.filters(0).changeStrength(1, g_iLightPointStrength, true);
		}
	
		// Light filter does not work on Win8. Remove it
		// g_PBInner.filters(0).moveLight(1, g_iLightLeft, 0, 50, true);
		g_iLightLeft = g_iLightLeft + g_iLightIncrement;
	
		if (g_iLightLeft >= iWidth)
		{
			//left is too big, re-set it
			g_iLightLeft = 0;
			iDelay = g_iLightDelay;
			// Light filter does not work on Win8. Remove it
			// g_PBInner.filters(0).changeStrength(1, 0, true);
		}
	}
	else
	{
		//disable the light source
		// Light filter does not work on Win8. Remove it
		// g_PBInner.filters(0).changeStrength(1, 0, true);
		iDelay = 1000;
	}
	
	g_iLightTimeoutID = window.setTimeout(PBAnimatePointLight, iDelay);

} //function PBAnimatePointLight()



/*	OnPBLightIt	*******************************************************
*
*	-	Call to add the light sources and start the animation
*	-	Typically called OnLoad of body
*
*	-	NOTE:	progid:DXImageTransform.Microsoft.Light()
*				- Must be the first filter set for idProgressInner element
***********************************************************************/
function OnPBLightIt()
{
    g_PBInner = document.getElementById(g_sPBIdProgressInner)
    if (null == g_PBInner)
    {
        return;		//inner progress bar container name 
					//must be: idProgressInner
    }

	//add lights, Ambient lights up the background, Point is for animation
	// Light filter does not work on Win8. Remove it
	// g_PBInner.filters(0).addAmbient(g_iLightAmbientRed, g_iLightAmbientGreen, g_iLightAmbientBlue, g_iLightAmbientStrength);
	
	/////// -> Removed light animation for CDGS, didn't look right
	//g_PBInner.filters(0).addPoint(0, 0, g_iLightPointZ, g_iLightPointRed, g_iLightPointGreen, g_iLightPointBlue, g_iLightPointStrength);
	
	g_iLightTimeoutID = 0;
	
    /////// -> Removed light animation for CDGS, didn't look right
    //PBAnimatePointLight();
    
} //function OnPBLightIt()


/*  function PBMoveRightSide()   **************************************
*
*   -	grows the width to its max, then calls PBMoveLeftSide()
***********************************************************************/
function PBMoveRightSide()
{
	var sWidth = g_PBInner.style.width;
	var iWidth = sWidth.replace("px", "");
	iWidth++;
	iWidth = iWidth + g_iPBIncrement;
	
	if (iWidth >= g_iPBMaxWidth)
	{
		iWidth = g_iPBMaxWidth;
		g_PBInner.style.width = iWidth;
		//PBMoveLeftSide() will shrink the progress bar from left to right
		//we don't want to do that anymore so, the call is just commented out
		//we stop moving the progress indicator once it reaches the end
		//PBMoveLeftSide();
	}
	else
	{
		g_PBInner.style.width = iWidth;
		g_iPBTimeoutID = window.setTimeout(PBMoveRightSide, g_iPBInderterminateDelay);
	}
            
} //function PBMoveRightSide()



/*  function PBMoveLeftSide()   ***************************************
*
*   -	moves the left side until it reaches its max, then calls PBMoveRightSide()
***********************************************************************/
function PBMoveLeftSide()
{
	var sLeft = g_PBInner.style.left;
	var iLeft = sLeft.replace("px", "");
	iLeft++;
	iLeft = iLeft + g_iPBIncrement;
	
	var sWidth = g_PBInner.style.width;
	var iWidth = sWidth.replace("px", "");
	iWidth--;
	iWidth = iWidth - g_iPBIncrement;

	if (iLeft >= g_iPBMaxWidth)
	{
		g_PBInner.style.left = 1;
		g_PBInner.style.width = 1;
		PBMoveRightSide();
	}
	else
	{
		g_PBInner.style.left = iLeft;
		g_PBInner.style.width = iWidth;
		g_iPBTimeoutID = window.setTimeout(PBMoveLeftSide, g_iPBInderterminateDelay);
	}

} //function PBMoveLeftSide()



/*  OnPBStartIndeterminate    *****************************************
*
*   - starts the progress bar, typically called from body
*   <body onload="OnPBStartIndeterminate()">
***********************************************************************/
function OnPBStartIndeterminate()
{
	g_PBInner = document.getElementById(g_sPBIdProgressInner)
    if (null == g_PBInner)
    {
        return;		//inner progress bar container name 
					//must be: idProgressInner
    }
    
    var pOuter = document.getElementById(g_sPBIdProgressOuter)
    if (null == pOuter)
    {
        return;		//inner progress bar container name 
					//must be: idProgressInner
    }

    var sWidth = pOuter.style.width;
    var iWidth = sWidth.replace("px", "");
    g_iPBMaxWidth = iWidth;
    
    //subtract boarders, and whitespace to get the max width
    //for the progress bar
    g_iPBMaxWidth--;
    g_iPBMaxWidth--;
    g_iPBMaxWidth--;
    g_iPBMaxWidth--;
    
    //start it a 0 width and on the left side
    g_iPBWidth = 0;
    g_PBInner.style.left = 1;
    g_PBInner.style.width = 0;
    
	PBMoveRightSide();
    
} //function OnPBStartIndeterminate()



/*	OnPBEndIt	*******************************************************
*
*   - clears any timers that may have started
***********************************************************************/
function OnPBEndIt()
{
    if (g_iPBTimeoutID > 0)
    {
        window.clearTimeout(g_iPBTimeoutID);
        g_iPBTimeoutID = 0;
    }
    
    if (g_iLightTimeoutID > 0)
    {
        window.clearTimeout(g_iLightTimeoutID);
        g_iLightTimeoutID = 0;
    }
                
} //function OnPBEndIt()
        
   
