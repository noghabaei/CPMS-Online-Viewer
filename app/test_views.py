import unittest
from django.test import TestCase
from .views import get_cleaned_profile_form_data

# Create test class
class ProfileFormTest:
    cleaned_data = None

    def set_cleaned_data(self, data):
        self.cleaned_data = data

# create test class
class ViewsTest(TestCase):

    def test_get_cleaned_profile_form_data(self):
        """Test method to extract data from front-end form."""
        # Arrange
        cleaned_data = {
            "username" : "user name",
            "email" : "email",
            "firstName" : "f name",
            "lastName" : "l name",
            "address" : "this is a test address",
            "city" : "city",
            "country" : "country",
            "postalCode" : "postal code",
            "aboutMe" : "about me"
        }

        # Act
        profileForm = ProfileFormTest()
        profileForm.set_cleaned_data(cleaned_data)

        resDict = get_cleaned_profile_form_data( profileForm )

        # Assert
        self.assertEqual(resDict["username"], "user name")
        self.assertEqual(resDict["email"], "email")
        self.assertEqual(resDict["firstName"], "f name")
        self.assertEqual(resDict["lastName"], "l name")
        self.assertEqual(resDict["address"], "this is a test address")
        self.assertEqual(resDict["city"], "city")
        self.assertEqual(resDict["country"], "country")
        self.assertEqual(resDict["postalCode"], "postal code")
        self.assertEqual(resDict["aboutMe"], "about me")
    
if __name__ == '__main__':
    unittest.main()
