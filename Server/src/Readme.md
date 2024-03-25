Cosas a actualizar:

• Variables de entorno, tanto de la DB como de Cloudinary.

• Ruta de la carpeta de Cloudinary donde se guardarán las fotos.

• Allowed Callback URLs, Allowed Logout URLs y Allowed Web Origins en Auth0/Applications

• Crear la action para post-logIn en Auth0:
exports.onExecutePostLogin = async (event, api) => {
api.redirect.sendUserTo("http://localhost:3000/admin");
}; --------> esto se está viendo si es necesario

• Cambiar la interacción con Auth0

Yup, there’s a much shorter (though still somewhat strange path) to achieve success:

Create a new tenant
Set it up (e.g. callback URL’s)
Confirm 401’s when sending in a valid code to /oauth/token
Change “Application Type” to “Regular Web Application”
Change “Token Endpoint Authentication Method” from “POST” to “None”. (Seems to be important part)
Confirm modal “… will disable the Client Credentials grant for…”
Confirm happy path (receive 200/OK when sending in that code to /oauth/token)
Here’s my ask:

Seems like when you set “Application Type” to “Single Page Application”, perhaps it should automatically set “Token Endpoint Authentication Method” to “None” ? Seems weird that I have to cycle through other app types, so that “Token Endpoint Authentication Method” field becomes active.
