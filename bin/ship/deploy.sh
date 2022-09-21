#!/usr/bin/env sh

set -e

if [[ $(gcloud config configurations list | grep -m1 houndstoothcraft) ]] ; then
	echo "The 'houndstoothcraft' configuration already exists."
else
	gcloud config configurations create houndstoothcraft
fi
gcloud config configurations activate houndstoothcraft
gcloud config set project houndstoothcraft
gcloud config set account kingwoodchuckii@gmail.com
gcloud auth login kingwoodchuckii@gmail.com

gcloud app deploy -q
