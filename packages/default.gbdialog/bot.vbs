<%
'****************************************************************************
'                                               ( )_  _                       
'    _ _    _ __   _ _    __    ___ ___     _ _ | ,_)(_)  ___   ___     _     
'   ( '_`\ ( '__)/'_` ) /'_ `\/' _ ` _ `\ /'_` )| |  | |/',__)/' _ `\ /'_`\   
'   | (_) )| |  ( (_| |( (_) || ( ) ( ) |( (_| || |_ | |\__, \| ( ) |( (_) )  
'   | ,__/'(_)  `\__,_)`\__  |(_) (_) (_)`\__,_)`\__)(_)(____/(_) (_)`\___/'  
'   | |                ( )_) |                                                
'   (_)                 \___/'                                                
'                                                                             
' General Bots Copyright (c) Pragmatismo.io. All rights reserved.             
' Licensed under the AGPL-3.0.                                                
'                                                                              
' According to our dual licensing model, this program can be used either      
' under the terms of the GNU Affero General Public License, version 3,        
' or under a proprietary license.                                             
'                                                                             
' The texts of the GNU Affero General Public License with an additional       
' permission and of our proprietary license can be found at and               
' in the LICENSE file you have received along with this program.              
'                                                                             
' This program is distributed in the hope that it will be useful,             
' but WITHOUT ANY WARRANTY, without even the implied warranty of              
' MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                
' GNU Affero General Public License for more details.                         
'                                                                             
' "General Bots" is a registered trademark of Pragmatismo.io.                 
' The licensing of the program under the AGPLv3 does not imply a              
' trademark license. Therefore any rights, title and interest in              
' our trademarks remain entirely with us.                                     
'                                                                             
'****************************************************************************

talk ("How many installments do you want to pay your Credit?")
installments = hear ()

talk ("What is the amount requested?")
ammount = hear ()

talk ("What is the initial payment value?")
valorEntrada = hear ()


talk ("What is the best due date?")
dueDate = hear ()

juros =0
coeficiente1=0

if installments <12 then
    juros = 1.60
    coeficiente = 0.09748
end if

if installments > 12 and installments< 18 then
   juros = 1.66
   coeficiente = 0.06869
end if

if installments > 18 and installments< 36 then
   juros = 1.64
   coeficiente = 0.05397
end if

if installments > 36 and installments< 48 then
   juros = 1.62
   coeficiente = 0.03931
end if

if installments > 48 and installments< 60 then
   juros = 1.70
   coeficiente = 0.03270
end if

if installments =60 then
   juros = 1.79
   coeficiente = 0.02916
end if

if installments > 60 then
    talk ("The maximum number of payments is 60")
end if


nInstallments = parseInt(installments)
vAmmount = parseFloat(ammount)
first = parseFloat(vAmmount) * 0.3 ' 30% of the value
tac = 800
coeficiente = 1.3

taxaJuros = parseFloat(juros)
valorFinanciado = ammount - valorEntrada + tac    
valorParcela = valorFinanciado * coeficiente
valorTotalDoBem = valorParcela * nInstallments + valorEntrada

talk("Your credit analysis is done.") 

talk("First payment" + valorEntrada)
talk("valorParcela" + valor)
talk("taxaJuros" + taxaJuros)
talk("valorFinanciado" + valorFinanciado)
talk("valorTotalDoBem" + valorTotalDoBem)


text = hear()

if email = "" then

	text = hear()


	if email = "" then
		talk ()
		text = hear()

		i1 = 10
	end if
else
	text = hear()
	if email = "" then
		talk ()
		text = hear()

		i2 = 10

		talk ()
		text = hear()

		talk ()
		text = hear()
	end if
end if

talk ()
text = hear()

i = 10

if i > 10 then
	text = hear()
	text = hear()
else
	text = hear()
	text = hear()
end if

%>