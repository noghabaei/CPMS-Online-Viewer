from django import forms


class ProfileForm(forms.Form):
    username = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                "id":"input-username",
                "placeholder": "Username",
                "class": "form-control form-control-alternative"
            }
        )
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(
            attrs={
                "id":"input-email",
                "placeholder": "Email Address",
                "class": "form-control form-control-alternative"
            }
        )
    )
    firstName = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                "id":"input-first-name",
                "placeholder": "First Name",
                "class": "form-control form-control-alternative"
            }
        )
    )
    lastName = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                "id":"input-last-name",
                "placeholder": "Last Name",
                "class": "form-control form-control-alternative"
            }
        )
    )
    address = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                "id":"input-address",
                "placeholder": "Address",
                "class": "form-control form-control-alternative"
            }
        )
    )
    city = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                "id":"input-city",
                "placeholder": "City",
                "class": "form-control form-control-alternative"
            }
        )
    )
    country = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                "id":"input-country",
                "placeholder": "Country",
                "class": "form-control form-control-alternative"
            }
        )
    )
    postalCode = forms.IntegerField(
        required=False,
        widget=forms.NumberInput(
            attrs={
                "id":"input-postal-code",
                "placeholder": "Postal Code",
                "class": "form-control form-control-alternative"
            }
        )
    )
    aboutMe = forms.CharField(
        required=False,
        widget=forms.Textarea(
            attrs={
                "id":"input-last-name",
                "placeholder": "A few words about you ...",
                "rows":"4",
                "class": "form-control form-control-alternative"
            }
        )
    )
    bio = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                "placeholder": "bio",
                "class": "form-control form-control-alternative"
            }
        ))
    location = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                "placeholder": "location",
                "class": "form-control form-control-alternative"
            }
        ))
