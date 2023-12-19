# Servicio Web de recomendación alimenticia en base a imagenes de comida

Este proyecto trata de resolver el problema de personas que por alguna razón no quieren o no pueden hacer un control rápido de los alimentos que consumen, por lo que en muchas ocasiones esto puede derivar en una mala alimentación. Para ello se propone un servicio web que en base a una imagen de comida, pueda generar una recomendación e información nutricional.

Este servicio web cuenta con 4 enpoints:

## Datos Personales

- **Nombre:** Dylan Imanol Chambi Frontanilla
- **Código** 55662

## Requerimientos

Se debe de tener instaladas las siguientes herramientas y bibliotecas antes de ejecutar el proyecto:

- [Python](https://www.python.org/): 3.10 o superior.
- Requirements.txt: Archivo que contiene todas las bibliotecas necesarias para ejecutar el proyecto.

## Pasos para ejecutar el proyecto

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/Dylan-Chambi/food-detect-recomendator.git
   cd food-detect-recomendator
   ```

2. **Crear un entorno virtual:**
   ```bash
    python -m venv venv
    ```
    o
    ```bash
    conda create -n venv python=3.10
    ```

3. **Activar el entorno virtual:**
    ```bash
    source venv/bin/activate
    ```
    o
    ```bash
    conda activate venv
    ```
4. **Instalar las bibliotecas necesarias:**
    ```bash
    pip install -r backend/requirements.txt
    cd Frontend && npm install && cd ..
    ```

5. **Colocar datos en los archivos**
    - **backend/.env:** Archivo que contiene las variables de entorno necesarias para ejecutar el backend.
        ```bash
        api_key=
        ```

    - **frontend/.env:** Archivo que contiene las variables de entorno necesarias para ejecutar el frontend.
        ```bash
        VITE_BACKEN_URL=
        ```

6. **Ejecutar el proyecto:**
    ```bash
    docker compose up
    ```

### Ejemplo de uso (Backend)

- **Endpoint:** /list-food-recomendations
    - **Method:** GET
    - **Response:**
        ```json
        [
            {
                "id": 0,
                "score": 0,
                "calories": 0,
                "proteins": 0,
                "fats": 0,
                "carbohydrates": 0,
                "fiber": 0,
                "sugar": 0,
                "sodium": 0,
                "general_recomendation": "string",
                "dietary_recomendations": [
                {
                    "food_name": "string",
                    "quantity": 0,
                    "calories": 0,
                    "proteins": 0,
                    "fats": 0,
                    "carbohydrates": 0,
                    "fiber": 0,
                    "sugar": 0,
                    "sodium": 0,
                    "recomendation": "string"
                }
                ],
                "image": "string"
            }
        ]
    ```

- **Endpoint:** /get-food-recomendation?recomendation_id=:id
    - **Method:** GET
    - **Body:**
        ```json
        {
            "id": 0,
            "score": 0,
            "calories": 0,
            "proteins": 0,
            "fats": 0,
            "carbohydrates": 0,
            "fiber": 0,
            "sugar": 0,
            "sodium": 0,
            "general_recomendation": "string",
            "dietary_recomendations": [
            {
                "food_name": "string",
                "quantity": 0,
                "calories": 0,
                "proteins": 0,
                "fats": 0,
                "carbohydrates": 0,
                "fiber": 0,
                "sugar": 0,
                "sodium": 0,
                "recomendation": "string"
            }
            ],
            "image": "string"
        }
        ```

- **Endpoint:** /add-food-recomendation
    - **Method:** POST
    - **Body:**
        ```json
        {
            "score": 0,
            "calories": 0,
            "proteins": 0,
            "fats": 0,
            "carbohydrates": 0,
            "fiber": 0,
            "sugar": 0,
            "sodium": 0,
            "general_recomendation": "string",
            "dietary_recomendations": [
            {
                "food_name": "string",
                "quantity": 0,
                "calories": 0,
                "proteins": 0,
                "fats": 0,
                "carbohydrates": 0,
                "fiber": 0,
                "sugar": 0,
                "sodium": 0,
                "recomendation": "string"
            }
            ],
            "image": "string"
        }
        ```

- **Endpoint:** /delete-food-recomendation?recomendation_id=:id
    - **Method:** DELETE

- **Endpoint:** /predict-food-image?confidence_threshold=0.5
    - **Method:** GET
    - **Body:**
        ```json
        {
            "image_file": "string"
        }
        ```
    - **Response:**
        ```json
        {
        "id": 0,
        "score": 0,
        "calories": 0,
        "proteins": 0,
        "fats": 0,
        "carbohydrates": 0,
        "fiber": 0,
        "sugar": 0,
        "sodium": 0,
        "general_recomendation": "string",
        "dietary_recomendations": [
            {
            "food_name": "string",
            "quantity": 0,
            "calories": 0,
            "proteins": 0,
            "fats": 0,
            "carbohydrates": 0,
            "fiber": 0,
            "sugar": 0,
            "sodium": 0,
            "recomendation": "string"
            }
        ],
        "image": "string"
        }
        ```

### Ejemplo de uso (Frontend)

- **Home page:** https://dylan-chambi.github.io/food-detect-recomendator/
    - **Select image:** Seleccionar una imagen de comida.
        ![Alt text](/images/image-1.png)
    - **Predict:** Visualizar imagen seleccionada
        ![Alt text](/images/image-2.png)
- **Recomendation page** https://dylan-chambi.github.io/food-detect-recomendator/food-recomendation/:id
    - **See recomendation:** Visualizar recomendación de la imagen seleccionada.
        ![Alt text](/images/image-3.png)
- **Show recomandation list** https://dylan-chambi.github.io/food-detect-recomendator/food-recomendation-list
    - **See recomendation list:** Visualizar lista de recomendaciones.
        ![Alt text](/images/image-4.png)


Tambien se puede probar el servicio web mediante los servicios desplegados en Google Cloud:

- Backend: https://food-detect-recomendator-547kwfnkdq-uc.a.run.app

- Frontend: https://dylan-chambi.github.io/food-detect-recomendator/