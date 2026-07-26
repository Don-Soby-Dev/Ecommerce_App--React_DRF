import uuid

from django.db import models
from django.utils.text import slugify

from users.models import User
from django.core.validators import MinValueValidator


# Category model
class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=255, unique=True)

    def __str__(self):
        return self.name


# Product model
class Product(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=255, unique=True)

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")

    title = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_sold = models.BooleanField(default=False, db_index=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0)]
    )
    img_url = models.URLField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["category", "is_sold"], name="idx_product_cat_sold"),
            models.Index(fields=["seller", "is_sold"], name="idx_product_seller_sold"),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            short_id = uuid.uuid4().hex[:6]
            self.slug = f"{base_slug}-{short_id}"
        super().save(*args, **kwargs)
