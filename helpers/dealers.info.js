 function processDealersInfo(usersCopy,packages) {
    const usersInfo=usersCopy
    for (let i = 0; i < usersInfo.length; i++) {
        usersInfo[i].paquetes = []; // Inicializar paquetes como un arreglo vacío
      for (let j = 0; j < packages.length; j++) {
        if (usersInfo[i]["_id"] == packages[j]["deliveryMan_id"]) {
            
            usersInfo[i].paquetes.push(packages[j]);
      
        }
      }
    }
  
    usersInfo.map((user) => {
      return user.porcentaje= (user.paquetes.filter((paquete) => {  return paquete.delivered;}).length / user.paquetes.length ) *100;
    });

    usersInfo.map((user) => {
        if(user.porcentaje===100){return user.status="ENTREGADO"}
        else if(user.porcentaje>0){return user.status="EN CURSO"}
        else{return user.status="INACTIVO"}
        
      });
    
  
    return usersInfo;
  }




  module.exports={processDealersInfo};