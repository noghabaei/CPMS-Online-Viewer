# CPMS Online Viewer

Application to enable loading, viewing and modifying 3-D generated construction models and point clouds on the Web using only front-end technology stack. Major functionalities of the application include:
- Dynamic construction schedule viewer
- Element View
- Point Cloud Compatibility View
- Picture overlay

Description video: https://www.youtube.com/watch?v=gv7z00ireis

## Technology Stack:
- Three.js r110
- Potree 1.6
- Python 3
- Django 2.1

Refer to [requirements.txt](https://github.com/mojtaba1995/CPMS-Online-Viewer/blob/main/requirements.txt) for other dependencies.

## How to install:

1. Clone this repository.
2. In project root, run `pip3 install -r requirements.txt` to install dependencies.

## How to run:
From the project root, run the following commands:

```
python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

## Team
[Mojtaba Noghabaei](https://github.com/mojtaba1995) </br>
[Chinmay Terse](https://github.com/cterse) </br>
[Arpitha Vijaykumar](https://github.com/VArpitha)