Param ($Guid)

$cpt = 1

filter Import-CimXml 
{ 
    $CimXml = [Xml]$_ 
    $CimObj = New-Object -TypeName System.Object 
    $data = ''
    $sep = ''
    foreach ($CimProperty in $CimXml.SelectNodes("/INSTANCE/PROPERTY"))
    { 
	if ($CimProperty.Name -eq 'Data')
	{
		$data = $CimProperty.VALUE
	}
	if ($CimProperty.Name -eq 'Name')
	{
		if ($cpt -gt 1)
		{
			$sep = ','
		}
		$cpt = $cpt + 1
		$sep + """" + $CimProperty.VALUE + """: """ + $data + """"
	}

    }
}

$Vm = Get-WmiObject -Namespace root\virtualization\v2 -Query "Select * From Msvm_ComputerSystem Where Name='$Guid'" 
$Kvp = Get-WmiObject -Namespace root\virtualization\v2 -Query "Associators of {$Vm} Where AssocClass=Msvm_SystemDevice ResultClass=Msvm_KvpExchangeComponent"


'{'
$Kvp.GuestIntrinsicExchangeItems | Import-CimXml
'}'
