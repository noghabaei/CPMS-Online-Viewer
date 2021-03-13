from django import forms

class ProfileForm(forms.Form):
    bio = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder" : "bio",                
                "class": "form-control form-control-alternative"
            }
        ))
    location = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder" : "location",                
                "class": "form-control form-control-alternative"
            }
        ))