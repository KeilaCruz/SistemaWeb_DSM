import requests


# Hacer solicitud para obtener el token
def get_token(username, password):
    vista_auth = "http://127.0.0.1:8000/logueo/iniciosesion"
    response = requests.post(
        vista_auth, data={"username": username, "password": password}
    )
    token = response.json()["token_access"]
    return token


# Hacer solicitud a la vista protegida
def realizar_solicitud(url, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    return response.json()


# Ejemplo
username = "KeilaCruz"
password = "12345678"

token_result = get_token(username, password)

if token_result:
    api_url = "http://127.0.0.1:8000/paciente/paciente/"
    data = realizar_solicitud(api_url, token_result)

    if data:
        print(data)
    else:
        print("accedio sin exito")
else:
    print("Error al obtener el token")
