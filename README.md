# EV2_Distributed_Systems
Evaluacion 2 para la materia Introduccion a sitemas distribuidos, 

Como segunda evaluación, se ha de realizar una API compuesta de varios servicios distribuidos

El punto de entrada a la API va a ser un proxy, este proxy sirve a dos BFFs, uno para aplicaciones móviles y otro para aplicaciones desktop. El proxy va a redirigir a un BFF en particular dependiendo del path de la petición.

Luego, los BFFs están encargados de realizar peticiones a los servicios backend como tal, a través de otro proxy configurado similarmente al anterior, el cual igualmente va a redirigir la petición en base al path en el URL de la petición.

Tienen que haber dos servicios, un servicio de autenticación que se encarga de proveer a usuarios la capacidad de registrarse y de poder validar sus credenciales, y un servicio de API como tal que expone la entidad definida, en este caso de vehiculos.

Hay dos tipos de usuarios, administrador y lector, un administrador puede hacer las 4 operaciones CRUD sobre cualquier objeto almacenado, mientras que un lector solo puede leer.

Todos los servicios (los BFF y los dos servicios principales) mandan sus logs a un acumulador de logs (En este caso se ha utilizado el middleware de NodeJS, Morgan).

PUERTOS DE CADA SERVICIO Y PROXY
* SERVICIO DE AUTH: 2000
* SERVICIO DE API: 2010
* PROXY A AMBOS SERVICIOS: 2020
* BFF PARA DESKTOP: 2030
* BFF PARA MOBILE: 2040
* PROXY A AMBOS BFF: 2050
