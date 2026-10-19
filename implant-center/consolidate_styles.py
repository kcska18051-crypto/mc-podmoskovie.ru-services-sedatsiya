"""Compatibility entry point: publish the canonical stylesheet, never merge legacy CSS."""
from pathlib import Path
import shutil
root=Path(__file__).parent
shutil.copyfile(root/'styles.css',root/'dist/styles.css')
print('Copied canonical styles.css to dist')
