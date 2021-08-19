# CPMS Online Viewer

Live App: http://cpms-viewer.herokuapp.com/

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

## Technical Documentation:

### Important Directories

| Component | DIR Path |
| -------------- | ---------- |
| Front-end application | core/ |
| Django Back-end application | app/ |
| Application dependencies | requirements.txt |
| Templates | core/templates/ |
| Static code assets | core/static/assets/ |
| Three.js Library | core/static/assets/three/ |
| Potree Library | core/static/assets/three/potree-main/ |
| Signals.js Library | core/static/assets/signals/ |
| Misc JavaScript Dependencies | core/static/assets/js/ |
| Main Point Clouds | https://mojtaba1995.github.io/clouds/cloud1/cloud.js </br> https://mojtaba1995.github.io/clouds/cloud2/cloud.js </br> https://mojtaba1995.github.io/clouds/cloud3/cloud.js |
| Compatibility Panel Point Clouds | core/static/assets/pointclouds/ |

### View Page
| Feature | Source Code File |
| -------------- | ---------- |
| BIM Load | core/templates/index.html |
| Point Cloud Load | core/templates/index.html |
| Element View Panel | core/templates/index.html |
| Compatibility Panel | core/static/assets/js/CompatibilityPanel.js |
| Transform Panel | core/static/assets/js/CompatibilityPanel.js |

### Compatibility Page
| Feature | Source Code File |
| -------------- | ---------- |
| Cross Section Viewer | core/templates/compatibility-test.html |

### User Profile Page
| Feature | Source Code File |
| -------------- | ---------- |
| User Profile Form | app/forms.py </br> app/views.py </br> app/models.py |
| Profile Pictures | Database |

## Team
[Mojtaba Noghabaei](https://github.com/mojtaba1995) </br>
[Chinmay Terse](https://github.com/cterse) </br>
[Arpitha Vijaykumar](https://github.com/VArpitha)