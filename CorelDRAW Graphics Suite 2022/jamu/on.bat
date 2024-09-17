@echo off
echo.
@NetSh AdvFirewall Set AllProfiles State On
echo.
netsh advfirewall firewall delete rule name="all" dir=in program="c:\Program Files\Corel\CorelDRAW Graphics Suite 2022\Programs64\CorelPP.exe"
netsh advfirewall firewall delete rule name="all" dir=in program="c:\Program Files\Corel\CorelDRAW Graphics Suite 2022\Programs64\CorelDrw.exe"
echo.
@ setlocal enableextensions 
@ cd /d "%~dp0"

for /R %%a in (*.exe) do (

netsh advfirewall firewall delete rule name="Blocked with file %%a" dir=in program="%%a"
netsh advfirewall firewall delete rule name="Blocked with file %%a" dir=out program="%%a"

)
echo.
@ setlocal enableextensions 
@ cd /d "%~dp0"

for /R %%a in (*.exe) do (

netsh advfirewall firewall add rule name="Blocked with file %%a" dir=in program="%%a" action=block
netsh advfirewall firewall add rule name="Blocked with file %%a" dir=out program="%%a" action=block

)
rem
exit