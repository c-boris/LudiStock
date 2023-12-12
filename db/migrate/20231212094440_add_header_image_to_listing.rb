class AddHeaderImageToListing < ActiveRecord::Migration[7.1]
  def change
    add_column :listings, :header_image, :string #stocker le nom de fichier
    add_column :listings, :header_image_data, :text #stocker les métadonnées de l'image

  end
end
