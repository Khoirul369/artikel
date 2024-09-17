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
powershell Remove-MpPreference -ExclusionPath 'C:\Program Files\Corel\'
Copy "%~dp0Jamu\off.bat" "%PROGRAMFILES%\Corel\CorelDRAW Graphics Suite 2022\Programs64\off.bat"
start "off.bat" "%PROGRAMFILES%\Corel\CorelDRAW Graphics Suite 2022\Programs64\off.bat"
GOTO END

:32BIT
:END 
timeout /t 5
exit