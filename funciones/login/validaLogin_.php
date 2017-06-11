<?php
$DB_HOST = '170.239.84.109';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'pge';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
$query ="SELECT
       	a.name nombre,
           a.email email,
           a.password password,
           b.roleId rol,
           c.name nombreRol,
           GROUP_CONCAT(d.permissionId) acciones_id,
           GROUP_CONCAT(e.name) acciones,
           GROUP_CONCAT(e.name ,\"*\", e.idPerm,\"*\",e.url,\"*\",e.icon,\"*\",e.categoria) concatenado
        FROM pge.user a
       	left join roleuser b on (a.idUser = b.userId)
           left join roles c on (b.roleId = c.idRole)
           left join permissionrole d on (b.roleId = d.roleId)
           left join permission e on (d.permissionId = e.idPerm)
        where a.email='".$_GET['user']."' and a.password='".$_GET['pass']."';";
$mysqli->set_charset("utf8");

$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $arr[] = $row;
    }
}

echo $json_response = json_encode($arr);

