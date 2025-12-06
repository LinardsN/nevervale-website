"""
Script to remove background from favicon.png and resize it for web use.
Requires: pip install Pillow rembg
"""

from PIL import Image
from rembg import remove
import io

def process_favicon():
    input_path = "assets/favicon.png"
    output_path = "assets/favicon.png"

    # Read the original image
    print("Loading image...")
    with open(input_path, "rb") as f:
        input_data = f.read()

    # Remove background
    print("Removing background...")
    output_data = remove(input_data)

    # Open the result and resize
    print("Resizing to 32x32...")
    img = Image.open(io.BytesIO(output_data))

    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Resize to 32x32 (standard favicon size)
    img_resized = img.resize((32, 32), Image.Resampling.LANCZOS)

    # Save the processed favicon
    img_resized.save(output_path, "PNG")
    print(f"Saved processed favicon to {output_path}")

    # Also create a larger version for Apple touch icon (180x180)
    print("Creating Apple touch icon (180x180)...")
    img_apple = img.resize((180, 180), Image.Resampling.LANCZOS)
    img_apple.save("assets/apple-touch-icon.png", "PNG")
    print("Saved apple-touch-icon.png")

    print("Done!")

if __name__ == "__main__":
    process_favicon()
