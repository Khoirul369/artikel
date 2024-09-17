@echo off
@ setlocal enableextensions 
@ cd /d "%~dp0"

for /R %%a in (*.exe) do (

netsh advfirewall firewall delete rule name="Blocked with file %%a" dir=in program="%%a"
netsh advfirewall firewall delete rule name="Blocked with file %%a" dir=out program="%%a"

)
rem
exit